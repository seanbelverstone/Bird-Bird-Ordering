import React, { Component } from "react";
import EmployeeLogin from "../components/LoginComponents/EmployeeLogin";
import OrderCalendar from "../components/LoginComponents/OrderCalendar";
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

		if (loggedIn === false) {
			// Passing setState down into the child so the child can update the parent's state
			displayedComponent = <EmployeeLogin setState = {(parameter) => {this.setState(parameter)}}/>
		} else {
			displayedComponent = <OrderCalendar />
		}


		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<button id="backToHome" onClick={this.homePage}>Back to Home</button>
					</div>
				</div>
				<div className="loginArea">
					<div className="row">
						<div className="col-12">
							<h1 id="title">EMPLOYEE LOGIN</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							{displayedComponent}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;