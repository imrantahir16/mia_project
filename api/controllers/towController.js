const Tow = require("../models/Tow");

const getAllTows = async (req, res) => {
  const tows = await Tow.find();
  if (!tows) return res.status(204).json({ message: "No Tow contact found" });
  res.json(tows);
};

const getTow = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Tow id is required" });
  const tow = await Tow.findOne({ _id: req.params.id }).exec();
  if (!tow)
    return res
      .status(404)
      .json({ message: `Tow ID ${req.params.id} not found` });
  res.json(tow);
};

const createTow = async (req, res) => {
  const { name, contact } = req.body;

  const foundTow = await Tow.findOne({ contact }).exec();
  if (foundTow)
    return res.status(409).json({ message: "Tow contact already exists" });

  const result = await Tow.create({
    name,
    contact,
  });

  res.status(201).json(result);
};

const deleteTow = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Tow Id is required" });
  const tow = await Tow.findOne({ _id: req.params.id }).exec();
  if (!tow)
    return res
      .status(404)
      .json({ message: `Tow ID ${req.params.id} not found` });
  const result = await tow.deleteOne({ _id: req.params.id });
  res.json(result);
};

const updateTow = async (req, res) => {
  const tow = await Tow.findOne({ _id: req.params.id });
  if (!tow)
    return res
      .status(400)
      .json({ message: `Tow contact of ID ${req.params.id} does not exist` });
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
