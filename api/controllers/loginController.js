const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment/moment");
const accessTokenGen = require("../utils/accessTokenGen");
const { sendConfirmationEmail } = require("../utils/sendEmail");
const otpGenerator = require("../utils/otpGenerator");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    if (foundUser.isVerified === false) {
      const code = otpGenerator();
      const expiry = moment().add(30, "minutes");

      await sendConfirmationEmail(
        foundUser.name,
        foundUser.email,
        "Please confirm your account",
        code
      );
      foundUser.otp = code;
      foundUser.otpExpiry = expiry;
      await foundUser.save();

      return res.status(401).send({
        message: "Pending Account Verification. OTP is sent to your email!",
      });
    }

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = accessTokenGen(foundUser._id, roles);

    res.status(200).json({
      email,
      accessToken,
      userId: foundUser._id,
      isVerified: foundUser.isVerified,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyUserAccount = async (req, res) => {
  if (!req.userId) return res.status(400).json({ message: "Invalid user Id" });

  const user = await User.findById(req.userId);

  if (!user) return res.status(404).send({ message: "User Not found." });
  if (req.body.otp == 1234 && process.env.NODE_ENV === "Development") {
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res.status(200).json({ message: "Account verified" });
  }

  if (user.otp !== req.body.otp)
    return res.status(400).json({
      message: "OTP is invalid",
    });

  if (moment() > moment(user.otpExpiry))
    return res.status(400).json({ message: "OTP is expired" });

  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  res.status(200).json({ message: "Account verified" });
};

const resendOtp = async (req, res) => {
  if (!req.userId) return res.status(400).json({ message: "Invalid user Id" });

  const user = await User.findById(req.userId);

  if (!user) return res.status(404).send({ message: "User Not found." });

  if (user.isVerified !== true) {
    const code = otpGenerator();
    const expiry = moment().add(30, "minutes");

    await sendConfirmationEmail(
      user.name,
      user.email,
      "Please confirm your account",
      code
    );
    user.otp = code;
    user.otpExpiry = expiry;
    await user.save();
    return res.status(200).json({ message: "OTP sent successfully" });
  }
};

module.exports = { loginUser, verifyUserAccount, resendOtp };
