const crypto = require("crypto");
const razorpay = require("../utils/razorpay");
const { RAZORPAY_KEY_SECRET, WEBHOOK_SECRET } = require("../config/env");

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt = "receipt#1" } = req.body;

    const options = {
      amount: amount, // in paise (₹100 = 10000)
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    return res.json(order);
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Verify Payment Signature
exports.verifyPayment = (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    res.json({ ok: true, msg: "Payment verified successfully" });
  } else {
    res.status(400).json({ ok: false, msg: "Invalid signature" });
  }
};

// Handle Webhooks
exports.handleWebhook = (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const expected = crypto.createHmac("sha256", WEBHOOK_SECRET).update(req.rawBody).digest("hex");

  if (expected === signature) {
    const event = req.body;
    console.log("Webhook received:", event.event);
    // You can store event in DB here
    res.status(200).json({ ok: true });
  } else {
    console.warn("❌ Invalid webhook signature");
    res.status(400).json({ ok: false });
  }
};
