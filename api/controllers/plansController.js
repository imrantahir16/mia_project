const User = require("../models/User");
const stripe = require("../utils/stripe");

const getSubscribedPlan = async (req, res) => {
  const user = await User.findById(req.userId);
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

  plan = {
    subscriptionId: subscriptions.data[0].id,
    planId: subscriptions.data[0].plan.id,
    planName: subscriptions.data[0].plan.nickname,
    isSubscribed: subscriptions.data[0].status === "active" ? true : false,
  };

  res.status(200).json(plan);
};

module.exports = { getSubscribedPlan };
