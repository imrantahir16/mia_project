const { body, validationResult } = require("express-validator");

const validateRegisterData = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
  body("phone")
    .optional()
    .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/)
    .withMessage("Phone number is not valid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password does not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateChangePasswordData = [
  // body("oldPassword").withMessage("Password is required"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.newPassword;
    })
    .withMessage("Password does not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateResetPasswordData = [
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 5 })
    .withMessage("OTP must be at least 5 digits")
    .isInt()
    .withMessage("OTP must be a number"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Password does not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateOTPData = [
  body("otp")
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 5 })
    .withMessage("OTP must be at least 5 digits")
    .isInt()
    .withMessage("OTP must be a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateLoginData = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateGoogleLoginData = [
  body("googleId").notEmpty().withMessage("Google ID is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
  body("name").optional(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateEmailData = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is not valid"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateContactUpdateData = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("contact")
    .optional()
    .notEmpty()
    .withMessage("Contact number is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateContactData = [
  body("name").notEmpty().withMessage("Name is required"),
  body("contact").notEmpty().withMessage("Contact number is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateReportData = [
  body("location.description")
    .optional()
    .notEmpty()
    .withMessage("Location description is required"),

  body("location.lat")
    .notEmpty()
    .withMessage("Location latitude is required")
    .isDecimal()
    .withMessage("Invalid value for latitude"),

  body("location.lng")
    .notEmpty()
    .withMessage("Location longitude is required")
    .isDecimal()
    .withMessage("Invalid value for longitude"),

  body("time").optional().isDate().withMessage("Invalid value for time"),

  body("weather")
    .optional()
    .notEmpty()
    .withMessage("Weather information is required"),

  body("speed")
    .optional()
    .notEmpty()
    .withMessage("Car speed is required")
    .isDecimal()
    .withMessage("Invalid value for speed"),

  body("traffic")
    .optional()
    .notEmpty()
    .withMessage("Traffic information is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
const validateUpdateReportData = [
  body("location.description")
    .optional()
    .notEmpty()
    .withMessage("Location description is required"),
  body("location.lat")
    .optional()
    .notEmpty()
    .withMessage("Location latitude is required")
    .isDecimal()
    .withMessage("Invalid value for latitude"),

  body("location.lng")
    .optional()
    .notEmpty()
    .withMessage("Location longitude is required")
    .isDecimal()
    .withMessage("Invalid value for longitude"),
  body("time").optional().isDate().withMessage("Invalid value for time"),
  body("weather")
    .optional()
    .notEmpty()
    .withMessage("Weather information is required"),
  body("speed")
    .optional()
    .notEmpty()
    .withMessage("Car speed is required")
    .isDecimal()
    .withMessage("Invalid value for speed"),
  body("traffic")
    .optional()
    .notEmpty()
    .withMessage("Traffic information is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = {
  validateRegisterData,
  validateLoginData,
  validateContactData,
  validateReportData,
  validateUpdateReportData,
  validateEmailData,
  validateChangePasswordData,
  validateResetPasswordData,
  validateOTPData,
  validateGoogleLoginData,
  validateContactUpdateData,
};
