import React, { Component } from "react";
import OrderForm from "../components/HomeComponents/OrderForm";
import BottomNav from "../components/HomeComponents/BottomNav";
import biscuits from "../images/minisResized.jpg";
import "./css/home.css";


class Home extends Component {

	loginPage(event) {
		event.preventDefault();
		window.location = window.location + "login";
	}

	render() {
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<button id="employeeButton" onClick={this.loginPage}></button>
							<p id="loginText">Employee Login</p>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h1 id="pageTitle">THANKSGIVING BISCUITS</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<img id="biscuits" src={biscuits} alt="a dozen biscuits" />
						</div>
					</div>
					<div className="row" id="orderFormContainer">
						<OrderForm />
					</div>

					</div>
				<BottomNav />

				</div>

		)
	}
}

export default Home;