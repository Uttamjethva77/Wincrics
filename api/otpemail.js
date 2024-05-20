// controllers/OtpController.js
require('dotenv').config();

const nodemailer = require('nodemailer');

class Otpemail {
  static async sendOtp(req, res) {
    const { email, otp } = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: 'Your OTP for verification',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Email</title>
    <style>
        body {
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #333333;
        }
        .header p {
            color: #666666;
        }
        .card {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #333333;
        }
        .paragraph {
            margin-bottom: 10px;
            color: #666666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Wincrics</h1>
            <p>Your platform for cricket!</p>
        </div>
        <div class="card">
            <p class="otp">Your OTP is: <strong>${otp}</strong></p>
            <p class="paragraph">Use this OTP to verify your account on Wincrics.</p>
            <p class="paragraph">Please do not share this OTP with anyone for security reasons.</p>
        </div>
        <p class="paragraph">If you didn't request this OTP, you can ignore this email.</p>
        </div>
</body>
</html>

            `,
    });

    console.log('Message sent: %s', info.messageId);

    res.status(200).json({ message: 'OTP sent successfully' });
  }
}

module.exports = Otpemail;
