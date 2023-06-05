const router = require("express").Router();
const {
  getAllEmergencies,
  createEmergency,
  deleteEmergency,
  getEmergency,
  updateEmergency,
} = require("../controllers/emergencyController");
const {
  validateContactData,
  validateContactUpdateData,
} = require("../middleware/validationMiddleware");
router
  .route("/")
  .get(getAllEmergencies)
  .post(validateContactData, createEmergency);

router
  .route("/:id")
  .get(getEmergency)
  .put(validateContactUpdateData, updateEmergency)
  .delete(deleteEmergency);

module.exports = router;
