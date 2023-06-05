const ROLES_LIST = require("../config/roles_list");
const Mechanic = require("../models/Mechanic");
const { ObjectId } = require("mongodb");

const getAllMechanics = async (req, res) => {
  console.log(req.userId);
  const mechanics = await Mechanic.find();
  if (!mechanics)
    return res.status(404).json({ message: "No Mechanic contact found" });

  const filteredMechanics = mechanics.filter(
    (c) => c.addedBy === ROLES_LIST.Admin || c.userId.toString() === req.userId
  );
  res.json(filteredMechanics);
};

const getMechanic = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Mechanic id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });

  const mechanic = await Mechanic.findOne({
    _id: req.params.id,
  }).exec();
  if (!mechanic)
    return res
      .status(404)
      .json({ message: `Mechanic ID ${req.params.id} not found` });

  if (
    mechanic.userId.toString() !== req.userId &&
    mechanic.addedBy !== ROLES_LIST.Admin
  )
    return res.status(401).json({ message: `Unathorized to get this contact` });

  res.json(mechanic);
};

const createMechanic = async (req, res) => {
  const { name, contact } = req.body;
  let result;

  const foundMechanic = await Mechanic.findOne({
    contact,
    userId: req.userId,
  }).exec();
  if (foundMechanic)
    return res.status(409).json({ message: "Mechanic contact already exists" });

  if (req.roles[1] !== ROLES_LIST.Admin) {
    result = await Mechanic.create({
      name,
      contact,
      userId: req.userId,
    });
  } else {
    result = await Mechanic.create({
      name,
      contact,
      addedBy: req.roles[1],
      userId: req.userId,
    });
  }

  res.status(201).json(result);
};

const deleteMechanic = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Mechanic Id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });

  const mechanic = await Mechanic.findOne({
    _id: req.params.id,
  }).exec();
  if (!mechanic)
    return res
      .status(404)
      .json({ message: `Mechanic ID ${req.params.id} not found` });

  if (mechanic.userId.toString() !== req.userId)
    return res
      .status(401)
      .json({ message: `Unauthorized to delete this contact` });
  await mechanic.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Contact deleted" });
};

const updateMechanic = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Mechanic Id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });

  const mechanic = await Mechanic.findOne({
    _id: req.params.id,
  });
  if (!mechanic)
    return res.status(404).json({
      message: `Mechanic contact of ID ${req.params.id} does not exist`,
    });

  if (mechanic.userId.toString() !== req.userId)
    return res.status(401).json({
      message: `Unauthorized to update this contact`,
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
