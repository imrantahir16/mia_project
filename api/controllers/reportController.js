const Report = require("../models/Report");
const fs = require("fs");

const generateReport = async (req, res) => {
  // console.log(req.userId);
  // make this all field optional except lat lng
  if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
  const newReport = {
    userId: req.userId,
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
  if (!reports) return res.status(204).json({ message: "No Report found" });
  res.status(200).json(reports);
};

const getReport = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Report id is required" });
  const report = await Report.findOne({ _id: req.params.id }).exec();
  if (!report)
    return res
      .status(404)
      .json({ message: `Report ID ${req.params.id} not found` });
  res.status(200).json(report);
};

const deleteReport = async (req, res) => {
  if (!req.params.id)
    return res.status(400).json({ message: "Report Id is required" });
  const report = await Report.findOne({ _id: req.params.id }).exec();
  if (!report)
    return res
      .status(404)
      .json({ message: `Report ID ${req.params.id} not found` });
  const result = await report.deleteOne({ _id: req.params.id });
  res.status(200).json(result);
};

const updateReport = async (req, res) => {
  // console.log(req.body);
  const report = await Report.findOne({ _id: req.params.id });
  if (!report)
    return res.status(400).json({
      message: `Report of ID ${req.params.id} does not exist`,
    });
  if (req.body["location.description"])
    report.location.description = req.body["location.description"];
  if (req.body["location.lat"]) report.location.lat = req.body["location.lat"];
  if (req.body["location.lng"]) report.location.lng = req.body["location.lng"];
  if (req.body.time) report.time = req.body.time;
  if (req.body.weather) report.weather = req.body.weather;
  if (req.body.speed) report.speed = req.body.speed;
  if (req.body.traffic) report.traffic = req.body.traffic;
  if (req.files.reportImages) {
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
