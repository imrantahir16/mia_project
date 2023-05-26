const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  deleteUser,
  changePassword,
  updateProfile,
  generateQrCode,
  retrieveDriverInfo,
} = require("../controllers/userController");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { uploadHandler } = require("../middleware/uploadMiddleware");
const {
  validateChangePasswordData,
} = require("../middleware/validationMiddleware");

router.route("/all").get(verifyRoles(ROLES_LIST.Admin), getAllUsers);

router.route("/").get(getUser).put(uploadHandler, updateProfile);

router
  .route("/:id?")
  .get(verifyRoles(ROLES_LIST.Admin), getUser)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.put("/change-password", validateChangePasswordData, changePassword);
router.post("/generate-qrcode", generateQrCode);
router.get("/qrcode/:userId", retrieveDriverInfo);

module.exports = router;
