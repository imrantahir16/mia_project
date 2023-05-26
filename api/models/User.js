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
    insurance: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
