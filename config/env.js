require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET, 
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN
};
