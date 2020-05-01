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


const App = () => {

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


  return (
      <Elements stripe={stripePromise}>
        <Router>
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
        </Router>  
      </Elements>



    )
}

export default App;