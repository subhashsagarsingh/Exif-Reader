const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const { PORT, FRONTEND_URL } = require("./config/env");

// Routes
const paymentRoutes = require("./routes/paymentRoutes");
const exifRoutes = require("./routes/exifRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Connect MongoDB
connectDB();

// CORS
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Body parser (for JSON & Razorpay webhook)
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

app.use(express.json());

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/payment", paymentRoutes);
app.use("/api/exif", exifRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
