import React, { Component } from "react";
import EmployeeLogin from "../components/LoginComponents/EmployeeLogin";
import OrderCalendar from "../components/LoginComponents/OrderCalendar";
import "./css/home.css";
import "./css/login.css";


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false
		}
	}
	
	homePage(event) {
		event.preventDefault();
		window.location.pathname = "/"
	}
	
	render() {

		const loggedIn = this.state.loggedIn;
		let displayedComponent;

		if (loggedIn === true || sessionStorage.getItem("birdBirdWebToken")) {
			displayedComponent = <OrderCalendar />

		} else {
			// Passing setState down into the child so the child can update the parent's state
			displayedComponent = 
			<div>
				<div className="row">
					<div className="col-12">
						<h1 id="title">EMPLOYEE LOGIN</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<EmployeeLogin setState={(parameter) => {this.setState(parameter)}} />
					</div>
				</div>
			</div>
		}


		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<button id="backToHome" onClick={this.homePage}></button>
						<p id="homeText">Back to Home</p>
					</div>
				</div>
				<div className="loginArea">
					{displayedComponent}
				</div>
			</div>
		)
	}
}

export default Login;