const User = require("../models/User");
const bcrypt = require("bcrypt");
const fs = require("fs");
const QRCode = require("qrcode");
const Jimp = require("jimp");
const qrcodeReader = require("qrcode-reader");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const getUser = async (req, res) => {
  console.log(req);
  const userId = req.params?.id ? req.params.id : req.userId;
  if (!userId) return res.status(400).json({ message: "User id is required" });
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) return res.status(204).json({ message: `User not found` });
  res.json(user);
};

const deleteUser = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "User Id is required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user)
    return res
      .status(404)
      .json({ message: `User ID ${req.params.id} not found` });
  const result = await User.deleteOne({ _id: req.params.id });
  res.json(result);
};

const changePassword = async (req, res) => {
  const userId = req.userId;
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const foundUser = await User.findOne({ _id: userId }).exec();
  if (!foundUser)
    return res.status(404).json({ message: `User does not exist` });

  try {
    if (foundUser.password) {
      if (!req.body.oldPassword)
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: "Old Password is required",
              path: "oldPassword",
              location: "body",
            },
          ],
        });
      const match = await bcrypt.compare(oldPassword, foundUser.password);
      if (!match)
        return res.status(400).json({
          errors: [
            {
              type: "field",
              msg: "Incorrect old password",
              path: "oldPassword",
              location: "body",
            },
          ],
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    foundUser.password = hashedPassword;

    await foundUser.save();
    res.json("Password changed");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, phone } = req.body;
  // console.log(req.files);
  const foundUser = await User.findOne({ _id: userId }).exec();
  if (!foundUser)
    return res.status(404).json({ message: `User does not exist` });

  if (name) foundUser.name = name;
  if (phone) foundUser.phone = phone;
  if (req.files.profileImage) {
    if (foundUser.profileImage !== "") {
      const filePath = foundUser.profileImage;
      fs.unlink(filePath, async (error) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error });
        }
      });
    }

    foundUser.profileImage = req.files.profileImage[0].path;
  }
  const result = await foundUser.save();
  res.json(result);
};

const generateQrCode = async (req, res) => {
  const userId = req.userId;
  QRCode.toFile(`public/qrcode/${userId}.png`, userId, (err) => {
    if (err) {
      res.status(500).json({ err });
    } else {
      res.status(200).json({ message: "Qr code generated" });
    }
  });
};

const retrieveDriverInfo = async (req, res) => {
  const { userId } = req.params;
  const foundUser = await User.findById(userId);
  res.status(200).json({
    driverInfo: {
      license: foundUser.drivingLicense,
      insurance: foundUser.insurance,
    },
  });
};
module.exports = {
  getAllUsers,
  getUser,
  deleteUser,
  changePassword,
  updateProfile,
  generateQrCode,
  retrieveDriverInfo,
};
