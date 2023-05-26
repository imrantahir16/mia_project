const Mechanic = require("../models/Mechanic");

const getAllMechanics = async (req, res) => {
  const mechanics = await Mechanic.find();
  if (!mechanics)
    return res.status(204).json({ message: "No Mechanic contact found" });
  res.json(mechanics);
};

const getMechanic = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Mechanic id is required" });
  const mechanic = await Mechanic.findOne({ _id: req.params.id }).exec();
  if (!mechanic)
    return res
      .status(404)
      .json({ message: `Mechanic ID ${req.params.id} not found` });
  res.json(mechanic);
};

const createMechanic = async (req, res) => {
  const { name, contact } = req.body;

  const foundMechanic = await Mechanic.findOne({ contact }).exec();
  if (foundMechanic)
    return res.status(409).json({ message: "Mechanic contact already exists" });

  const result = await Mechanic.create({
    name,
    contact,
  });

  res.status(201).json(result);
};

const deleteMechanic = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Mechanic Id is required" });
  const mechanic = await Mechanic.findOne({ _id: req.params.id }).exec();
  if (!mechanic)
    return res
      .status(404)
      .json({ message: `Mechanic ID ${req.params.id} not found` });
  const result = await mechanic.deleteOne({ _id: req.params.id });
  res.json(result);
};

const updateMechanic = async (req, res) => {
  const mechanic = await Mechanic.findOne({ _id: req.params.id });
  if (!mechanic)
    return res.status(404).json({
      message: `Mechanic contact of ID ${req.params.id} does not exist`,
    });
  if (req.body.name) mechanic.name = req.body.name;
  if (req.body.contact) mechanic.contact = req.body.contact;
  const result = await mechanic.save();
  res.json(result);
};

module.exports = {
  getAllMechanics,
  getMechanic,
  createMechanic,
  deleteMechanic,
  updateMechanic,
};
