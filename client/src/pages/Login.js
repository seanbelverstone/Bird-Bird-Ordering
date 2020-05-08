import React, { Component } from "react";



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
			</div>
		)
	}
}

export default Login;