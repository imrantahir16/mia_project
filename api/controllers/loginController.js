const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    if (foundUser.status != "Active")
      return res.status(401).send({
        message: "Pending Account. Please Verify Your Email!",
      });

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30d" }
    );
    res.status(200).json({
      email,
      accessToken,
      userId: foundUser._id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyUserAccount = async (req, res) => {
  const user = await User.findOne({
    otp: req.body.otp,
  });

  if (!user) return res.status(404).send({ message: "User Not found." });

  if (moment() > moment(user.otpExpiry))
    return res.status(400).json({ message: "OTP is invalid or expired" });

  user.status = "Active";
  user.otp = null;
  user.otpExpiry = null;
  const result = await user.save();
  res.status(200).json({ message: "Account verified" });
};

module.exports = { loginUser, verifyUserAccount };
