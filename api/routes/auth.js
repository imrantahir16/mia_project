const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const {
  loginUser,
  verifyUserAccount,
} = require("../controllers/loginController");
const { registerUser } = require("../controllers/registerController");
const {
  validateRegisterData,
  validateLoginData,
} = require("../middleware/validationMiddleware");

router.post("/register", validateRegisterData, registerUser);
router.post("/login", validateLoginData, loginUser);
router.get("/verify", verifyUserAccount);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.CLIENT_BASE_URL,
  }),
  (req, res) => {
    // console.log(req.user);
    const roles = Object.values(req.user.roles).filter(Boolean);
    jwt.sign(
      {
        UserInfo: {
          userId: req.user._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30h" },
      (error, accessToken) => {
        if (error) {
          return res.json({
            accessToken: null,
          });
        }
        res.status(200).json({ accessToken });
      }
    );
  }
);

module.exports = router;
