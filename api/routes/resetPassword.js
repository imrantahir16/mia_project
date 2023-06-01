const {
  sendOTP,
  resetPassword,
} = require("../controllers/resetPasswordController");
const {
  validateResetPasswordData,
  validateEmailData,
} = require("../middleware/validationMiddleware");

const router = require("express").Router();

router.post("/sendotp", validateEmailData, sendOTP);
router.post("/", validateResetPasswordData, resetPassword);

module.exports = router;
