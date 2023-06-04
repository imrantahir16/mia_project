const ROLES_LIST = require("../config/roles_list");
const Tow = require("../models/Tow");

const getAllTows = async (req, res) => {
  const tows = await Tow.find();
  if (!tows) return res.status(404).json({ message: "No Tow contact found" });

  const filteredTows = tows.filter(
    (c) => c.addedBy === ROLES_LIST.Admin || c.userId.toString() === req.userId
  );
  res.status(200).json(filteredTows);
};

const getTow = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Tow id is required" });
  const tow = await Tow.findOne({
    _id: req.params.id,
  }).exec();
  if (!tow)
    return res
      .status(404)
      .json({ message: `Tow ID ${req.params.id} not found` });

  if (tow.userId.toString() !== req.userId)
    return res.status(401).json({ message: `Unathorized to get this contact` });
  res.json(tow);
};

const createTow = async (req, res) => {
  const { name, contact } = req.body;
  let result;

  const foundTow = await Tow.findOne({ contact }).exec();
  if (foundTow)
    return res.status(409).json({ message: "Tow contact already exists" });

  if (req.roles[1] !== ROLES_LIST.Admin) {
    result = await Tow.create({
      name,
      contact,
      userId: req.userId,
    });
  } else {
    result = await Tow.create({
      name,
      contact,
      addedBy: req.roles[1],
      userId: req.userId,
    });
  }

  res.status(201).json(result);
};

const deleteTow = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Tow Id is required" });
  const tow = await Tow.findOne({
    _id: req.params.id,
  }).exec();
  if (!tow)
    return res
      .status(404)
      .json({ message: `Tow ID ${req.params.id} not found` });

  if (tow.userId.toString() !== req.userId)
    return res.status(401).json({
      message: `Unauthorized to update this contact`,
    });
  const result = await tow.deleteOne({ _id: req.params.id });
  res.json(result);
};

const updateTow = async (req, res) => {
  const tow = await Tow.findOne({ _id: req.params.id });
  if (!tow)
    return res
      .status(400)
      .json({ message: `Tow contact of ID ${req.params.id} does not exist` });

  if (tow.userId.toString() !== req.userId)
    return res.status(401).json({
      message: `Unauthorized to update this contact`,
    });
  if (req.body.name) tow.name = req.body.name;
  if (req.body.contact) tow.contact = req.body.contact;
  const result = await tow.save();
  res.json(result);
};

module.exports = {
  getAllTows,
  getTow,
  createTow,
  deleteTow,
  updateTow,
};
