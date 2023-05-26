const router = require("express").Router();
const {
  getAllTows,
  createTow,
  getTow,
  deleteTow,
  updateTow,
} = require("../controllers/towController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { validateContactData } = require("../middleware/validationMiddleware");

router
  .route("/")
  .get(getAllTows)
  .post(verifyRoles(ROLES_LIST.Admin), validateContactData, createTow);

router
  .route("/:id")
  .get(getTow)
  .put(verifyRoles(ROLES_LIST.Admin), validateContactData, updateTow)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteTow);

module.exports = router;
