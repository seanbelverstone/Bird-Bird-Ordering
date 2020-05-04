const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const router = express.Router();
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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Endpoint for when `/stripe/charge` is called from client
app.post('/stripe/charge', async (request, response) => {
  try {
    // Create the PaymentIntent
    let intent;
    if (request.body.payment_method_id) {
    intent = await stripe.paymentIntents.create({
      amount: "1099",
      currency: 'usd',
      payment_method: request.body.payment_method_id,

      // A PaymentIntent can be confirmed some time after creation,
      // but here we want to confirm (collect payment) immediately.
      confirm: true,

      // Checking if the payment requires authentication
      confirmation_method: "manual"
    });
  } else if (request.body.payment_intent_id) {
    intent = await stripe.paymentIntents.confirm(
      request.body.payment_intent_id
    );
  }
    return generateResponse(response, intent);
  } catch (e) {
    if (e.type === 'StripeCardError') {
      // Display error on client
      return response.send({ error: e.message });
    } else {
      // Something else happened
      return response.status(500).send({ error: e.type });
    }
  }
});

function generateResponse(response, intent) {
  if (intent.status === 'succeeded') {
    // Handle post-payment fulfillment
    return response.send({ success: true });

  } else if (intent.status === 'requires_action') {
    // Tell the client to handle the action
    return response.send({
      requiresAction: true,
      clientSecret: intent.client_secret
    });

  } else {
    // Any other status would be unexpected, so error
    return response.status(500).send({error: 'Unexpected status ' + intent.status});
  }
}

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next()
});


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
