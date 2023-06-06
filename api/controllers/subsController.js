const User = require("../models/User");
const stripe = require("../utils/stripe");

const getPriceController = async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
};

const createCheckoutSession = async (req, res) => {
  try {
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

    // Update the user's subscription status in MongoDB
    user.isSubscribed = true;
    user.subscribedPlanId = req.body.priceId;
    await user.save();

    return res.json(session);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
};

const billingPortal = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });
  const customerId = user.stripeCustomerId;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
  });

  res.json(portalSession);
};

module.exports = {
  getPriceController,
  createCheckoutSession,
  billingPortal,
};
