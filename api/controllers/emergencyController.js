const ROLES_LIST = require("../config/roles_list");
const Emergency = require("../models/Emergency");
const { ObjectId } = require("mongodb");

const getAllEmergencies = async (req, res) => {
  const emergencies = await Emergency.find();
  if (!emergencies)
    return res.status(404).json({ message: "No Emergency contact found" });

  const filteredEmergencies = emergencies.filter(
    (c) => c.addedBy === ROLES_LIST.Admin || c.userId.toString() === req.userId
  );
  res.json(filteredEmergencies);
};

const getEmergency = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Emergency id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });

  const emergency = await Emergency.findOne({ _id: req.params.id }).exec();
  if (!emergency)
    return res
      .status(409)
      .json({ message: `Emergency ID ${req.params.id} not found` });

  if (
    emergency.userId.toString() !== req.userId &&
    emergency.addedBy !== ROLES_LIST.Admin
  )
    return res.status(401).json({ message: `Unathorized to get this contact` });

  res.json(emergency);
};

const createEmergency = async (req, res) => {
  const { name, contact } = req.body;
  let result;

  const foundEmergency = await Emergency.findOne({
    contact,
    userId: req.userId,
  }).exec();

  if (foundEmergency)
    return res
      .status(409)
      .json({ message: "Emergency contact already exists" });

  if (req.roles[1] !== ROLES_LIST.Admin) {
    result = await Emergency.create({
      name,
      contact,
      userId: req.userId,
    });
  } else {
    result = await Emergency.create({
      name,
      contact,
      addedBy: req.roles[1],
      userId: req.userId,
    });
  }

  res.status(201).json(result);
};

const deleteEmergency = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Emergency Id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });
  const emergency = await Emergency.findOne({ _id: req.params.id }).exec();

  if (!emergency)
    return res
      .status(404)
      .json({ message: `Emergency ID ${req.params.id} not found` });

  if (emergency.userId.toString() !== req.userId)
    return res
      .status(401)
      .json({ message: `Unathorized to delete this contact` });

  await emergency.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Contact deleted" });
};

const updateEmergency = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Mechanic Id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });

  const emergency = await Emergency.findOne({ _id: req.params.id });

  if (!emergency)
    return res.status(404).json({
      message: `Emergency contact of ID ${req.params.id} does not exist`,
    });

  if (emergency.userId.toString() !== req.userId)
    return res
      .status(401)
      .json({ message: `Unathorized to update this contact` });

  if (req.body.name) emergency.name = req.body.name;
  if (req.body.contact) emergency.contact = req.body.contact;

  const result = await emergency.save();
  res.json(result);
};

module.exports = {
  getAllEmergencies,
  getEmergency,
  createEmergency,
  deleteEmergency,
  updateEmergency,
};
