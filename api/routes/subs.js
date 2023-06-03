const router = require("express").Router();
const {
  getPriceController,
  createCheckoutSession,
} = require("../controllers/subsController");

router.get("/prices", getPriceController);
router.post("/session", createCheckoutSession);

module.exports = router;
