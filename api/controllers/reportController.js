const Report = require("../models/Report");
const User = require("../models/User");
const fs = require("fs");
const { ObjectId } = require("mongodb");
const ROLES_LIST = require("../config/roles_list");

const generateReport = async (req, res) => {
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const user = await User.findById(req.userId);
  const newReport = {
    userId: req.userId,
    username: user?.name,
    location: {
      description: req.body["location.description"],
      lat: req.body["location.lat"],
      lng: req.body["location.lng"],
    },
    weather: req.body?.weather,
    time: req.body?.time,
    speed: req.body?.speed,
    traffic: req.body?.traffic,
    reportImages: req.files?.reportImages?.map((imageFile) => imageFile.path),
  };

  const result = await Report.create(newReport);
  res.status(201).json(result);
};

const getAllReports = async (req, res) => {
  const reports = await Report.find();
  if (!reports) return res.status(404).json({ message: "No Report found" });

  if (req.roles.length > 1 && req.roles[1] === ROLES_LIST.Admin)
    return res.status(200).json(reports);

  const filteredReports = reports.filter((report) => {
    return report.userId.toString() === req.userId;
  });

  if (!filteredReports)
    return res.status(200).json({ message: "No Report found" });

  res.status(200).json(filteredReports);
};

const getReport = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Report id is required" });

  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid Id" });
  let report;
  if (req.roles.length > 1 && req.roles[1] === ROLES_LIST.Admin) {
    report = await Report.findOne({
      _id: req.params.id,
    }).exec();
  } else {
    report = await Report.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).exec();
  }
  if (!report)
    return res
      .status(404)
      .json({ message: `Report ID ${req.params.id} not found` });
  res.status(200).json(report);
};

const deleteReport = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Report Id is required" });

  let report;
  if (req.roles.length > 1 && req.roles[1] === ROLES_LIST.Admin) {
    report = await Report.findOne({
      _id: req.params.id,
    }).exec();
  } else {
    report = await Report.findOne({
      _id: req.params.id,
      userId: req.userId,
    }).exec();
  }
  if (!report)
    return res
      .status(404)
      .json({ message: `Report ID ${req.params.id} not found` });
  const result = await report.deleteOne({ _id: req.params.id });
  res.status(200).json(result);
};

const updateReport = async (req, res) => {
  // console.log(req.body);
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).json({ message: "Invalid id" });

  let report;
  if (req.roles.length > 1 && req.roles[1] === ROLES_LIST.Admin) {
    report = await Report.findOne({
      _id: req.params.id,
    });
  } else {
    report = await Report.findOne({
      _id: req.params.id,
      userId: req.userId,
    });
  }
  if (!report)
    return res.status(400).json({
      message: `Report of ID ${req.params.id} does not exist`,
    });
  if (req?.body["location.description"])
    report.location.description = req.body["location.description"];
  if (req?.body["location.lat"]) report.location.lat = req.body["location.lat"];
  if (req?.body["location.lng"]) report.location.lng = req.body["location.lng"];
  if (req?.body?.time) report.time = req.body.time;
  if (req?.body?.weather) report.weather = req.body.weather;
  if (req?.body?.speed) report.speed = req.body.speed;
  if (req?.body?.traffic) report.traffic = req.body.traffic;
  if (req?.files?.reportImages) {
    if (report.reportImages.length !== 0) {
      const filesToDelete = [...report.reportImages];
      filesToDelete.forEach((file) => {
        fs.unlink(file, async (error) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error });
          }
        });
      });
    }
    report.reportImages = req.files.reportImages.map(
      (imageFile) => imageFile.path
    );
  }
  const result = await report.save();
  res.status(200).json(result);
};

module.exports = {
  getAllReports,
  getReport,
  generateReport,
  deleteReport,
  updateReport,
};
