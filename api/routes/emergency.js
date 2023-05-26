const router = require("express").Router();
const {
  getAllEmergencies,
  createEmergency,
  deleteEmergency,
  getEmergency,
  updateEmergency,
} = require("../controllers/emergencyController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { validateContactData } = require("../middleware/validationMiddleware");
router
  .route("/")
  .get(getAllEmergencies)
  .post(verifyRoles(ROLES_LIST.Admin), validateContactData, createEmergency);

router
  .route("/:id")
  .get(getEmergency)
  .put(verifyRoles(ROLES_LIST.Admin), validateContactData, updateEmergency)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmergency);

module.exports = router;
