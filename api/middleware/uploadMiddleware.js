const multer = require("multer");
const upload = require("../utils/storage");
const uploadHandler = (req, res, next) => {
  upload(req, res, (err) => {
    // console.log(req.files);
    if (err) {
      if (err.code === "LIMIT_UNEXPECTED_FILE")
        return res.status(400).json({
          error: `Too many files uploaded for ${err.field}`,
        });
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = { uploadHandler };
