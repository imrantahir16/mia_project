const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      default: null,
    },
    roles: {
      User: {
        type: Number,
        default: 2021,
      },
      Admin: Number,
    },
    drivingLicense: {
      type: String,
      default: "",
    },
    licenseExpiry: {
      type: Date,
    },
    insurance: {
      type: String,
      default: "",
    },
    insuranceExpiry: {
      type: Date,
    },
    profileImage: {
      type: String,
      default: "",
    },
    otp: {
      type: Number,
      unique: true,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscribedPlanId: {
      type: String,
      default: "",
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    policyId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
