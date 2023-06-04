const router = require("express").Router();
const {
  getPriceController,
  createCheckoutSession,
  billingPortal,
} = require("../controllers/subsController");

router.get("/prices", getPriceController);
router.post("/session", createCheckoutSession);
router.post("/customer-portal", billingPortal);

module.exports = router;
