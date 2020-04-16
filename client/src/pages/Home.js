import React, { Component } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderForm from "../components/OrderForm";
import biscuits from "../images/dozenbiscuitsflip.jpg";
import "./css/home.css";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_secret_key);


class Home extends Component {
	

	show = () => console.log(process.env.REACT_APP_stripe_secret_key);


	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<button id="employeeButton" onClick={this.show}>Employee Login</button>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h1 id="pageTitle">BISCUITS BY THE DOZEN</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<img id="biscuits" src={biscuits} alt="a dozen biscuits" />
					</div>
				</div>
				<div className="row">
					<OrderForm />
				</div>


			</div>
		)
	}
}

export default Home;