const router = require("express").Router();
const {
  loginUser,
  googleLoginUser,
  verifyUserAccount,
  resendOtp,
} = require("../controllers/loginController");
const { registerUser } = require("../controllers/registerController");
const {
  validateRegisterData,
  validateLoginData,
  validateGoogleLoginData,
  validateOTPData,
} = require("../middleware/validationMiddleware");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/register", validateRegisterData, registerUser);
router.post("/login", validateLoginData, loginUser);
router.post("/google", validateGoogleLoginData, googleLoginUser);
router.post("/verify", validateOTPData, verifyJWT, verifyUserAccount);
router.get("/resendotp", verifyJWT, resendOtp);

module.exports = router;
