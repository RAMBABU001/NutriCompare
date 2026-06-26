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

textContent: "Use this OTP to securely reset your password.",


htmlContent: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
</head>

<body style="
    margin:0;
    padding:0;
    background:#000000;
">

<div style="
    background:linear-gradient(
        180deg,
        transparent,
        #ff00c8 0%,
        #d300ff 35%,
        #7a4dff 55%,
        #00a2ff 100%,
        transparent
    );
    border-radius:22px;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    padding:3.5px;
    text-align:center;
">

    <div style="
        max-width:440px;
        margin:0px auto;
        border-radius:20px;
        padding:35px 20px;
        background:#000000;
        border:2px solid #ffffff;
    ">

        <img
            src="https://raw.githubusercontent.com/RAMBABU001/NutriCompare/main/frontend/fav1.png"
            width="110"
            alt="NutriCompare"
            style="
                display:block;
                margin:0px auto 0px auto;
            ">

        <img
            src="https://raw.githubusercontent.com/RAMBABU001/NutriCompare/main/frontend/mail.png"
            width="320"
            alt="NutriCompare"
            style="
                display:block;
                margin:0px auto 10px auto;
            ">

        <h1 style="
            color:#ffffff;
            font-size:26px;
            font-weight:600;
            margin:0 0 18px 0;
        ">
            Reset your password
        </h1>

        <p style="
            color:#ffffff;
            font-size:16px;
            margin:24px 0 6px 0;
        ">
            Your code is
        </p>

        <div style="
            display:inline-block;
            padding:12px 16px;
            border-radius:14px;
            background:linear-gradient(
                180deg,
                rgb(80,80,80),
                rgb(50,50,50)
            );
            border:3.5px solid #00ff00;
            margin-bottom:44px;
        ">

            <span style="
                color:#00eeff;
                font-size:40px;
                font-weight:800;
                letter-spacing:6px;
                display:block;
                text-align:center;
                line-height:1;
                width:100%;
            ">
                ${savedOTP}
            </span>

        </div>

        <div style="
            width:300px;
            height:3.8px;
            margin:0 auto 10px auto;
            background:linear-gradient(
                90deg,
                transparent,
                #ff00c8,
                #00a2ff,
                #ff00c8,
                transparent
            );
        ">
        </div>

    </div>
</div>

</body>
</html>
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