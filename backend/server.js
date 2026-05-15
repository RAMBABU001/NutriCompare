require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");

const User = require("./models/User"); // ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  express.static(
    path.join(process.cwd(), "../frontend")
  )
);

app.use(authRoutes);
app.use(foodRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));



let savedOTP = "";
let savedEmail = "";



// SEND OTP
app.post("/send-otp", async (req, res) => {

  const { email } = req.body;

  savedEmail = email;

  // 4 digit OTP
  savedOTP =
    Math.floor(1000 + Math.random() * 9000).toString();

  const transporter =
    nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: "nutricompare8374@gmail.com",

        pass: "gnqg plll wmxy gyje"
      }
    });

  const mailOptions = {

    from: "NutriCompare@gmail.com",

    to: email,

    subject: "NutriCompare - Password Reset OTP",

    text: `Your OTP is ${savedOTP}`
  };

  try{

    await transporter.sendMail(mailOptions);

    res.json({
      message: "OTP Sent Successfully"
    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message: "Failed To Send OTP"
    });
  }
});



// VERIFY OTP
app.post("/verify-otp", (req, res) => {

  const { otp } = req.body;

  if(otp === savedOTP){

    res.json({
      success: true
    });

  }else{

    res.json({
      success: false
    });
  }
});



// RESET PASSWORD
app.post("/reset-password", async (req, res) => {

  const { password } = req.body;

  try{

    // hash new password
    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.updateOne(

      { email: savedEmail },

      { $set: { password: hashedPassword } }
    );

    res.json({
      message: "Password Updated Successfully"
    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      message: "Failed To Update Password"
    });
  }
});

app.use((req, res) => {

  res.sendFile(
    path.join(
      process.cwd(),
      "../frontend",
      "signup.html"
    )
  );
});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server Running on Port ${PORT}`
  );
});