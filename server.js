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
    let intent = await stripe.paymentIntents.create({
      amount: "1099",
      currency: 'usd',
      payment_method: request.body.payment_method_id,

      // A PaymentIntent can be confirmed some time after creation,
      // but here we want to confirm (collect payment) immediately.
      confirm: true,

      // If the payment requires any follow-up actions from the
      // customer, like two-factor authentication, Stripe will error
      // and you will need to prompt them for a new payment method.
      error_on_requires_action: true
    });
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
