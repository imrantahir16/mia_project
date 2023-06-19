const User = require("../models/User");
const stripe = require("../utils/stripe");
const ROLES_LIST = require("../config/roles_list");

const getSubscribedPlan = async (req, res) => {
  let userId;
  if (
    req.roles.length > 1 &&
    req.roles[1] === ROLES_LIST.Admin &&
    !req.params.id
  ) {
    userId = req.userId;
  } else if (
    req.roles.length > 1 &&
    req.roles[1] === ROLES_LIST.Admin &&
    req.params.id
  ) {
    userId = req.params.id;
  } else if (
    req.roles.length === 1 &&
    req.params.id &&
    req.userId !== req.params.id
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    userId = req.userId;
  }
  if (!userId) return res.status(400).json({ message: "User id is required" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  let plan;
  const subscriptions = await stripe.subscriptions.list(
    {
      customer: user.stripeCustomerId,
      status: "all",
      expand: ["data.default_payment_method"],
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  if (!subscriptions.data.length) {
    plan = {
      isSubscribed: false,
    };
    return res.json(plan);
  }

  // console.log(subscriptions);
  plan = {
    subscriptionId: subscriptions.data[0].id,
    planId: subscriptions.data[0].plan.id,
    planName: subscriptions.data[0].plan.nickname,
    status: subscriptions.data[0].status,
    isSubscribed: subscriptions.data[0].status === "active" ? true : false,
    startData: subscriptions.data[0].start_date,
    currentPeriodStart: subscriptions.data[0].current_period_start,
    currentPeriodEnd: subscriptions.data[0].current_period_end,
  };

  res.status(200).json(plan);
};

module.exports = { getSubscribedPlan };
