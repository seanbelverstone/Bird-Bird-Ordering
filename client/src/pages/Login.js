import React, { Component } from "react";
import DownloadButton from "../components/LoginComponents/DownloadButton";
import EmployeeLogin from "../components/LoginComponents/EmployeeLogin";
import OrderCalendar from "../components/LoginComponents/OrderCalendar";
import API from "../utils/API";
import "./css/home.css";
import "./css/login.css";
import { format } from "date-fns";


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			rawData: [],
			selectedMonth: format(new Date(), 'MMM')
		}
	}
	
	componentDidMount () {
	// performs an API call to pull all the orders from the database.
	API.getAllOrders().then(response => {
		this.setState({
			rawData: response.data
		})
		console.log(response.data, 'data')
	})
	}
	
	homePage(event) {
		event.preventDefault();
		window.location.pathname = "/"
	}

	handleDate = (date) => {
		this.setState({
			selectedMonth: format(date, 'MMM')
		})
	}
	
	
	render() {
		const { rawData, loggedIn, selectedMonth } = this.state;
		let displayedComponent;

		if (loggedIn === true || sessionStorage.getItem("birdBirdWebToken")) {
			displayedComponent = (
				<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
					<DownloadButton rawData={rawData} selectedMonth={selectedMonth}/>
					<OrderCalendar rawData={rawData} callback={this.handleDate} />
				</div>
			)

		} else {
			// Passing setState down into the child so the child can update the parent's state
			displayedComponent = 
			<div id="loginBackground">
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