const User = require("../models/User");
const stripe = require("../utils/stripe");

const getPriceController = async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
};

const createCheckoutSession = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],

      success_url: `${process.env.CLIENT_BASE_URL}subscription/completion`,
      cancel_url: `${process.env.CLIENT_BASE_URL}subscription`,
      customer: user.stripeCustomerId,
    },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  );

  return res.json(session);
};

module.exports = {
  getPriceController,
  createCheckoutSession,
};