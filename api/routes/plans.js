const router = require("express").Router();
const { getSubscribedPlan } = require("../controllers/plansController");

router.get("/", getSubscribedPlan);

module.exports = router;
