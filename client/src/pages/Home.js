import React, { Component } from "react";
import OrderForm from "../components/OrderForm";
import biscuits from "../images/dozenbiscuitsflip.jpg";
import "./css/home.css";

class Home extends Component {
	
	
	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<button id="employeeButton">Employee Login</button>
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