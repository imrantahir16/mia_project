const router = require("express").Router();
const {
  getAllMechanics,
  createMechanic,
  deleteMechanic,
  getMechanic,
  updateMechanic,
} = require("../controllers/mechanicController");
const { validateContactData } = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(getAllMechanics)
  .post(validateContactData, createMechanic);

router
  .route("/:id")
  .get(getMechanic)
  .put(validateContactData, updateMechanic)
  .delete(deleteMechanic);

module.exports = router;
