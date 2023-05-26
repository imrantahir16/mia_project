const {
  sendToken,
  resetPassword,
} = require("../controllers/resetPasswordController");
const {
  validateResetPasswordData,
  validateEmailData,
} = require("../middleware/validationMiddleware");

const router = require("express").Router();

router.post("/", validateEmailData, sendToken);
router.post("/:userId/:token", validateResetPasswordData, resetPassword);

module.exports = router;
