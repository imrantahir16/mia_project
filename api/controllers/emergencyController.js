const Emergency = require("../models/Emergency");

const getAllEmergencies = async (req, res) => {
  const emergencies = await Emergency.find();
  if (!emergencies)
    return res.status(204).json({ message: "No Emergency contact found" });
  res.json(emergencies);
};

const getEmergency = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Emergency id is required" });
  const emergency = await Emergency.findOne({ _id: req.params.id }).exec();
  if (!emergency)
    return res
      .status(409)
      .json({ message: `Emergency ID ${req.params.id} not found` });
  res.json(emergency);
};

const createEmergency = async (req, res) => {
  const { name, contact } = req.body;

  const foundEmergency = await Emergency.findOne({ contact }).exec();
  if (foundEmergency)
    return res
      .status(409)
      .json({ message: "Emergency contact already exists" });

  const result = await Emergency.create({
    name,
    contact,
  });

  res.status(201).json(result);
};

const deleteEmergency = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Emergency Id is required" });
  const emergency = await Emergency.findOne({ _id: req.params.id }).exec();
  if (!emergency)
    return res
      .status(404)
      .json({ message: `Emergency ID ${req.params.id} not found` });
  const result = await emergency.deleteOne({ _id: req.params.id });
  res.json(result);
};

const updateEmergency = async (req, res) => {
  const emergency = await Emergency.findOne({ _id: req.params.id });
  if (!emergency)
    return res.status(404).json({
      message: `Emergency contact of ID ${req.params.id} does not exist`,
    });
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
