const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require("moment/moment");
const accessTokenGen = require("../utils/accessTokenGen");
const { sendConfirmationEmail } = require("../utils/sendEmail");
const otpGenerator = require("../utils/otpGenerator");
const stripe = require("../utils/stripe");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = accessTokenGen(foundUser._id, roles);

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
        accessToken,
        user: foundUser,
        message: "Pending Account Verification. OTP is sent to your email!",
      });
    }

    if (foundUser.isSubscribed !== true) {
      const subscriptions = await stripe.subscriptions.list(
        {
          customer: foundUser.stripeCustomerId,
          status: "all",
          expand: ["data.default_payment_method"],
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );
      foundUser.isSubscribed =
        subscriptions?.data[0]?.status === "active" ? true : false;
      foundUser.subscribedPlanId = subscriptions?.data[0]?.plan.id || "";

      await foundUser.save();
    }

    res.status(200).json({
      accessToken,
      user: foundUser,
      otp: foundUser.otp,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyUserAccount = async (req, res) => {
  if (!req.userId) return res.status(400).json({ message: "Invalid user Id" });

  const user = await User.findById(req.userId);

  if (!user) return res.status(404).send({ message: "User Not found." });
  if (
    parseInt(req.body.otp) == 12345 &&
    process.env.NODE_ENV === "Development"
  ) {
    const roles = Object.values(user.roles).filter(Boolean);
    const accessToken = accessTokenGen(user._id, roles);
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();
    return res
      .status(200)
      .json({ accessToken, user: user, message: "Account verified" });
  }

  console.log(user);
  console.log(user.otp, req.body.otp);
  if (user.otp !== parseInt(req.body.otp))
    return res.status(400).json({
      message: "OTP is invalid",
    });

  if (moment() > moment(user.otpExpiry))
    return res.status(400).json({ message: "OTP is expired" });

  const roles = Object.values(user.roles).filter(Boolean);
  const accessToken = accessTokenGen(user._id, roles);
  user.isVerified = true;
  user.otp = null;
  user.otpExpiry = null;
  await user.save();
  res
    .status(200)
    .json({ accessToken, user: user, message: "Account verified" });
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
