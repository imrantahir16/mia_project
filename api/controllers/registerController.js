const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendConfirmationEmail } = require("../utils/sendEmail");
const otpGenerator = require("../utils/otpGenerator");
const moment = require("moment/moment");
const stripe = require("../utils/stripe");
const accessTokenGen = require("../utils/accessTokenGen");

const registerUser = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  const userExists = await User.findOne({ email }).exec();

  if (userExists)
    return res.status(409).json({ message: "User already exists" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const customer = await stripe.customers.create(
      {
        name,
        email,
        phone: phone || null,
      },
      { apiKey: process.env.STRIPE_SECRET_KEY }
    );
    const code = otpGenerator();
    const expiry = moment().add(30, "minutes");
    // console.log(code);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      stripeCustomerId: customer.id,
      otp: code,
      otpExpiry: expiry,
    });

    console.log(newUser._id, newUser.roles);
    await sendConfirmationEmail(
      name,
      email,
      "Please confirm your account",
      code
    );
    const roles = Object.values(newUser.roles).filter(Boolean);
    const accessToken = accessTokenGen(newUser._id, roles);
    res.status(201).json({
      accessToken,
      user: newUser,
      message:
        "User was registered successfully! Please check your email for confirmation code",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
