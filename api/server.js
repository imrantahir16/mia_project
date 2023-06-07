// externel libraries import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// internal imports
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const origin = require("./middleware/origins");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const {
  licenseRemover,
  insuranceRemover,
  infoUploader,
} = require("./controllers/driverController");
const { uploadHandler } = require("./middleware/uploadMiddleware");
const {
  handleCheckoutSessionCompleted,
} = require("./controllers/stripeWebhookController");

require("dotenv").config();
require("colors");
// initializing app
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

// cors
app.use(origin);
app.use(cors(corsOptions));

// static file
app.use(express.static("public"));

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routers
app.get("/api/success(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "success.html"));
});
app.get("/api/cancel(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cancel.html"));
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reset-password", require("./routes/resetPassword"));
app.post("/api/webhook/stripe", handleCheckoutSessionCompleted);

app.use(verifyJWT);
app.use("/api/emergency", require("./routes/emergency"));
app.use("/api/mechanic", require("./routes/mechanic"));
app.use("/api/tows", require("./routes/tow"));
app.use("/api/users", require("./routes/users"));
app.use("/api/report", require("./routes/report"));
app.use("/api/subs", require("./routes/subs"));
app.use("/api/plans", require("./routes/plans"));

app.post("/api/upload-info", uploadHandler, infoUploader);
app.delete("/api/delete-license", licenseRemover);
app.delete("/api/delete-insurance", insuranceRemover);

// error middleware
app.use(errorHandler);

// checking database connection and server running
mongoose.connection.once("open", () => {
  console.log("Database connected".green.underline);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan.underline);
  });
});

// module.exports = upload;
