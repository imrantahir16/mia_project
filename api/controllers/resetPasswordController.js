const User = require("../models/User");
const Token = require("../models/Token");
const { sendResetPasswordEmail } = require("../utils/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const otpGenerator = require("../utils/otpGenerator");
const moment = require("moment/moment");

const sendOTP = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(404)
        .json({ message: "User with given email doesn't exist" });

    // let token = await Token.findOne({ userId: user._id });
    // if (!token) {
    //   token = await new Token({
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex"),
    //   }).save();
    // }
    if (user.status !== "Active")
      return res
        .status(400)
        .json({ message: "Pending Account. Please Verify Your Email!" });

    const code = otpGenerator();
    const expiry = moment().add(30, "minutes");
    let result;
    if (user.otp !== null && moment() > moment(user.otpExpiry)) {
      result = await sendResetPasswordEmail(
        user.name,
        user.email,
        "Password reset",
        code
      );
      user.otp = code;
      user.otpExpiry = expiry;
      await user.save();
    } else {
      result = await sendResetPasswordEmail(
        user.name,
        user.email,
        "Password reset",
        code
      );
      user.otp = code;
      user.otpExpiry = expiry;
      await user.save();
    }

    if (result) {
      return res
        .status(200)
        .json({ message: "Password reset OTP sent to your email account" });
    } else {
      return res.status(500).json({ message: "Email could not sent" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { otp, password } = req.body;
  try {
    const user = await User.findOne({ otp });
    if (!user)
      return res.status(400).json({ message: "OTP is invalid or expired" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendOTP,
  resetPassword,
};
