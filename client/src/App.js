import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";

const stripePromise = loadStripe(process.env.stripe_secret_key);
console.log(process.env.stripe_secret_key);

export default function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
          </div>
        </Elements>
    </Router>  
    )
}