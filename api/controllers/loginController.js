const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ message: "Incorrect password" });

    const roles = Object.values(foundUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          userId: foundUser._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({ email, accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser };
