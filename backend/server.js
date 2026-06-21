require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const axios = require("axios");

const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");

const User = require("./models/User");

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

  savedOTP =
    Math.floor(1000 + Math.random() * 9000).toString();

  try{

    await axios.post(

      "https://api.brevo.com/v3/smtp/email",

      {

        sender: {

  name: "NutriCompare",

  email: "nutricompare8374@gmail.com"
},

        to: [
  {
    email: email
  }
],

subject: "NutriCompare - Password Reset OTP",

textContent: `Your OTP is ${savedOTP}`,

htmlContent: `
<div style="
    text-align:center;
    font-family:Arial,sans-serif;
    margin:0;
    padding:0;
">

  <img
    src="https://raw.githubusercontent.com/RAMBABU001/NutriCompare/main/frontend/NCLL1.png"
    width="260"
    alt="NutriCompare Logo">


  <p style="
      margin:10px 0 0 0;
      padding:0;
  ">
      Your Password Reset OTP is:
  </p>

  <h1 style="
      margin:10px 0 0 0;
      letter-spacing:5px;
      color:#00a2ff;
  ">
      ${savedOTP}
  </h1>

</div>
`
      },

      {

        headers: {

          "api-key": process.env.BREVO_API_KEY,

          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      message: "OTP Sent Successfully"
    });

  }catch(error){

    console.log(error.response?.data || error);

    res.status(500).json({
      message: "Failed To Send OTP"
    });
  }
});



// VERIFY OTP
app.post("/verify-otp", (req, res) => {

  const { otp } = req.body;

  if(savedOTP !== "" && otp === savedOTP){

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