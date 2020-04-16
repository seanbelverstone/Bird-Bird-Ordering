const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const stripe = require("stripe")(process.env.stripe_secret_key);
require("dotenv").config();
import routes from "./routes";

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Middleware
app.use(express.json())
routes(app);


// Send every request to the React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Setting up the payment intent variable for Stripe.js
const paymentIntent = await stripe.paymentIntents.create({
  amount: 10,
  currency: 'usd',
  // Verifying integration 
  metadata: {integration_check: "accept_a_payment"},
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
