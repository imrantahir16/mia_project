const router = require("express").Router();
const {
  getAllMechanics,
  createMechanic,
  deleteMechanic,
  getMechanic,
  updateMechanic,
} = require("../controllers/mechanicController");
const {
  validateContactData,
  validateContactUpdateData,
} = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(getAllMechanics)
  .post(validateContactData, createMechanic);

router
  .route("/:id")
  .get(getMechanic)
  .put(validateContactUpdateData, updateMechanic)
  .delete(deleteMechanic);

module.exports = router;
