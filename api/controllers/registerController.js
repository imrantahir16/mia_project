const User = require("../models/User");
const bcrypt = require("bcrypt");
// const isEmailValid = require("../utils/emailValidator");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../utils/sendEmail");

const registerUser = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  const userExists = await User.findOne({ email }).exec();

  if (userExists)
    return res.status(409).json({ message: "User already exists" });

  try {
    // generate salt and hashedPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = jwt.sign(
      { email: req.body.email },
      process.env.ACCESS_TOKEN_SECRET
    );
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      confirmationCode: token,
    });

    const link = `${process.env.BASE_URL}api/auth/confirm/${token}`;
    await sendConfirmationEmail(
      name,
      email,
      "Please confirm your account",
      link
    );
    res.status(201).json({
      message: "User was registered successfully! Please check your email",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
