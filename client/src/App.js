import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
            <Route path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </div>
    </Router>  
    )
}