const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    googleId: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: [true, "Please add your name"],
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
    confirmationCode: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
