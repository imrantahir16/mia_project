const multer = require("multer");

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "license") {
      cb(null, "public/images/license");
    } else if (file.fieldname === "insurance") {
      cb(null, "public/images/insurance");
    } else if (file.fieldname === "profileImage") {
      cb(null, "public/images/profileImage");
    } else if (file.fieldname === "reportImages") {
      cb(null, "public/images/reportImages");
    }
  },
  filename: (req, file, callback) => {
    // console.log("here", file.fieldname);
    const originalExtension = file.originalname.split(".").pop();
    const filename = `${
      Date.now() + "_" + Math.round(Math.random() * 1e9)
    }.${originalExtension}`;
    callback(null, filename);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ["image/jpeg", "image/png", "video/mp4"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error(
      "Invalid file type. Only JPEG, PNG, and MP4 files are allowed."
    );
    error.code = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([
  { name: "license", maxCount: 1 },
  { name: "insurance", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
  { name: "reportImages", maxCount: 4 },
]);

module.exports = upload;
