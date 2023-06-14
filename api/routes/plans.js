const router = require("express").Router();
const { getSubscribedPlan } = require("../controllers/plansController");

router.get("/:id?", getSubscribedPlan);

module.exports = router;
