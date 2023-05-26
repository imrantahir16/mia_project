const User = require("../models/User");
const fs = require("fs");

const infoUploader = async (req, res) => {
  const userId = req.userId;
  const isEmpty = Object.keys(req.files).length === 0;
  if (isEmpty)
    return res.status(400).json({ message: "Select atleast one file" });

  const user = await User.findOne({ _id: userId }).exec();
  if (!user)
    return res
      .status(404)
      .json({ message: `User with an id ${userId} doesn't exist` });

  try {
    if (req.files.license) {
      if (user.drivingLicense !== "") {
        const filePath = `${user.drivingLicense}`;
        fs.unlink(filePath, async (error) => {
          if (error) {
            return res.status(500).json({ error });
          }
        });
      }
      // const filename = `${req.files.license[0].filename}`;
      user.drivingLicense = `${req.files.license[0].path}`;
    }
    if (req.files.insurance) {
      if (user.insurance !== "") {
        const filePath = `${user.insurance}`;
        fs.unlink(filePath, async (error) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error });
          }
        });
      }
      // const filename = `${req.files.insurance[0].filename}`;
      user.insurance = `${req.files.insurance[0].path}`;
    }
    await user.save();
    res.status(200).json({ message: "File upload successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const licenseRemover = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) return res.status(404).json({ message: `User not found` });

  // console.log(user.drivingLicense);
  try {
    const filePath = `${user.drivingLicense}`;
    fs.unlink(filePath, async (error) => {
      if (error) {
        // console.error(error);
        return res.status(500).json({ message: `File does not exist` });
      } else {
        user.drivingLicense = "";
        await user.save();
        return res.status(200).json({ message: "File removed successful" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const insuranceRemover = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId }).exec();
  if (!user) return res.status(404).json({ message: `User not found` });

  try {
    const filePath = `${user.insurance}`;
    fs.unlink(filePath, async (error) => {
      if (error) {
        // console.error(error);
        return res.status(500).json({ message: `File does not exist` });
      } else {
        user.insurance = "";
        await user.save();
        res.status(200).json({ message: "File removed successful" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  infoUploader,
  licenseRemover,
  insuranceRemover,
};
