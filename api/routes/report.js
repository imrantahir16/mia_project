const router = require("express").Router();
const {
  getAllReports,
  generateReport,
  getReport,
  deleteReport,
  updateReport,
} = require("../controllers/reportController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const {
  validateReportData,
  validateUpdateReportData,
} = require("../middleware/validationMiddleware");
const { uploadHandler } = require("../middleware/uploadMiddleware");

router
  .route("/")
  .get(getAllReports)
  .post(uploadHandler, validateReportData, generateReport);

router
  .route("/:id")
  .get(getReport)
  .put(
    verifyRoles(ROLES_LIST.Admin),
    uploadHandler,
    validateUpdateReportData,
    updateReport
  )
  .delete(verifyRoles(ROLES_LIST.Admin), deleteReport);

module.exports = router;
