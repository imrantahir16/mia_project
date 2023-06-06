const User = require("../models/User");

// Webhook endpoint to handle the checkout.session.completed event
const handleCheckoutSessionCompleted = async (req, res) => {
  let data;
  let eventType;
  // Check if webhook signing is configured.
  const webhookSecret = "whsec_3KlRopcWqYk4CEvh5POyFB8zGdNhjoAQ";
  if (webhookSecret) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }

  switch (eventType) {
    case "checkout.session.completed":
      const customerId = data.object.customer;
      console.log(customerId);
      // Find the user in the user collection based on the customer ID
      const user = await User.findOne({ stripeCustomerId: customerId });
      console.log(user);

      // Update the user's subscription status and subscribed plan ID
      user.isSubscribed = true;
      user.subscribedPlanId = data.object.display_items[0].price.id; // Assuming there's only one item in the display_items array
      await user.save();

      console.log("User subscription updated successfully.");
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  res.sendStatus(200);
};

module.exports = { handleCheckoutSessionCompleted };
