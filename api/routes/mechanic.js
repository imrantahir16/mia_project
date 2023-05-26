const router = require("express").Router();
const {
  getAllMechanics,
  createMechanic,
  deleteMechanic,
  getMechanic,
  updateMechanic,
} = require("../controllers/mechanicController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { validateContactData } = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(getAllMechanics)
  .post(verifyRoles(ROLES_LIST.Admin), validateContactData, createMechanic);

router
  .route("/:id")
  .get(getMechanic)
  .put(verifyRoles(ROLES_LIST.Admin), validateContactData, updateMechanic)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteMechanic);

module.exports = router;
