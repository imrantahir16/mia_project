const User = require("../models/User");

// Webhook endpoint to handle the checkout.session.completed event
const handleCheckoutSessionCompleted = async (req, res) => {
  const { data } = req.body;

  try {
    // Retrieve the customer ID from the webhook event
    const customerId = data.object.customer;

    // Find the user in the user collection based on the customer ID
    const user = await User.findOne({ stripeCustomerId: customerId });

    // Update the user's subscription status and subscribed plan ID
    user.isSubscribed = true;
    user.subscribedPlanId = data.object.display_items[0].price.id; // Assuming there's only one item in the display_items array
    await user.save();

    console.log("User subscription updated successfully.");

    return res.json({ received: true });
  } catch (error) {
    console.error("Failed to update user subscription:", error);
    return res
      .status(500)
      .json({ error: "Failed to update user subscription" });
  }
};

module.exports = { handleCheckoutSessionCompleted };
