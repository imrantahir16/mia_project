const router = require("express").Router();
const {
  getAllTows,
  createTow,
  getTow,
  deleteTow,
  updateTow,
} = require("../controllers/towController");
const { validateContactData } = require("../middleware/validationMiddleware");

router.route("/").get(getAllTows).post(validateContactData, createTow);

router
  .route("/:id")
  .get(getTow)
  .put(validateContactData, updateTow)
  .delete(deleteTow);

module.exports = router;
