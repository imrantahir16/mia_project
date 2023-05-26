const User = require("../models/User");
const bcrypt = require("bcrypt");
const isEmailValid = require("../utils/emailValidator");

const registerUser = async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  const userExists = await User.findOne({ email }).exec();

  if (userExists)
    return res.status(409).json({ message: "User already exists" });

  try {
    // generate salt and hashedPassword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser };
