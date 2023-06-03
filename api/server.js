// externel libraries import
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

// internal imports
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const origin = require("./middleware/origins");
const corsOptions = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
const {
  licenseRemover,
  insuranceRemover,
  infoUploader,
} = require("./controllers/driverController");
const { uploadHandler } = require("./middleware/uploadMiddleware");

require("dotenv").config();
require("colors");
require("./config/passport")(passport);
// initializing app
const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

// stripe init
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

// cors
app.use(origin);
app.use(cors(corsOptions));

// static file
app.use(express.static("public"));

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// just checking

// session middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/api/auth", require("./routes/auth"));
app.use("/api/reset-password", require("./routes/resetPassword"));

// subscription api
const createSubscription = async (createSubscriptionRequest) => {
  // create a stripe customer
  const customer = await stripe.customers.create({
    name: createSubscriptionRequest.body.name,
    email: createSubscriptionRequest.body.email,
    payment_method: createSubscriptionRequest.body.paymentMethod,
    invoice_settings: {
      default_payment_method: createSubscriptionRequest.body.paymentMethod,
    },
  });

  // get the price id from the front-end
  const priceId = createSubscriptionRequest.body.priceId;

  // create a stripe subscription
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: priceId }],
    payment_settings: {
      payment_method_options: {
        card: {
          request_three_d_secure: "any",
        },
      },
      payment_method_types: ["card"],
      save_default_payment_method: "on_subscription",
    },
    expand: ["latest_invoice.payment_intent"],
  });

  // return the client secret and subscription id
  return {
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    subscriptionId: subscription.id,
  };
};
app.post("/api/create-subscription", (req, res) => {
  createSubscription(req);
});

app.get("/api/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("api/create-checkout-session", async (req, res) => {
  console.log(req.body.lookup_key);
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ["data.product"],
  });
  console.log("Iam consoling it", prices.data[0].id);
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.BASE_URL}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/?canceled=true`,
  });
  console.log("session", session.line_items);

  res.send("got here");
  // res.redirect(303, session.url);
});

app.post("/api/create-portal-session", async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = process.env.BASE_URL;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

app.use(verifyJWT);
app.use("/api/emergency", require("./routes/emergency"));
app.use("/api/mechanic", require("./routes/mechanic"));
app.use("/api/tows", require("./routes/tow"));
app.use("/api/users", require("./routes/users"));
app.use("/api/report", require("./routes/report"));

app.post("/api/upload-info", uploadHandler, infoUploader);
app.delete("/api/delete-license", licenseRemover);
app.delete("/api/delete-insurance", insuranceRemover);

// error middleware
app.use(errorHandler);

// checking database connection and server running
mongoose.connection.once("open", () => {
  console.log("Database connected".green.underline);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.cyan.underline);
  });
});

// module.exports = upload;
