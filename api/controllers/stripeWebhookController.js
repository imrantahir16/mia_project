const User = require("../models/User");
const stripe = require("../utils/stripe");

// Webhook endpoint to handle the checkout.session.completed event
const handleCheckoutSessionCompleted = async (req, res) => {
  let event = req.body;
  // console.log(event);

  switch (event.type) {
    case "checkout.session.completed":
      const customerId = event["data"]["object"]["customer"];
      console.log(customerId);
      // Find the user in the user collection based on the customer ID
      const subscriptions = await stripe.subscriptions.list(
        {
          customer: customerId,
          status: "all",
          expand: ["data.default_payment_method"],
        },
        {
          apiKey: process.env.STRIPE_SECRET_KEY,
        }
      );
      const user = await User.findOne({ stripeCustomerId: customerId });

      // Update the user's subscription status and subscribed plan ID
      user.isSubscribed = true;
      user.subscribedPlanId = subscriptions.data[0].plan.id;
      await user.save();
      console.log(user);
      break;
    default:
      return res.status(400).end();
  }
  res.status(200).json({ recieved: true });
};

module.exports = { handleCheckoutSessionCompleted };
