const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){

      return res.json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({

      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "Signup Success"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Signup Failed"
    });
  }
});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.json({
        message: "Wrong password"
      });
    }

    res.json({
       token: "success",
       name: user.name,
       email: user.email
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Login Failed"
    });
  }
});

module.exports = router;