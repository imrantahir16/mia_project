const User = require("../models/User");
const stripe = require("../utils/stripe");

const getSubscribedPlan = async (req, res) => {
  const user = await User.findById(req.userId);

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

  if (!subscriptions.data.length) return res.json([]);

  const plan = subscriptions.data[0].plan.nickname;

  res.status(200).json({ plan });
};

module.exports = { getSubscribedPlan };
