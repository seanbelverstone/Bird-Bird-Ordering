import React, { Component } from "react";
import EmployeeLogin from "../components/LoginComponents/EmployeeLogin";


class Login extends Component {
	
	homePage(event) {
		event.preventDefault();
		window.location.pathname = "/"
	}
	
	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<button id="backToHome" onClick={this.homePage}>Back to Home</button>
					</div>
				</div>
				<div className="loginArea" style={{border: "2px black solid"}}>
					<div className="row">
						<div className="col-12">
							Employee Login
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<EmployeeLogin />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Login;