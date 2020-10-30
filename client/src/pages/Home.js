import React, { Component } from "react";
import Firebase from "firebase";
import config from "../components/Firebase/config";
import OrderForm from "../components/HomeComponents/OrderForm";
import BottomNav from "../components/HomeComponents/BottomNav";
import biscuits from "../images/minisResized.jpg";
import "./css/home.css";


class Home extends Component {
	// initalizing Firebase in the Homepage
	constructor(props) {
		super(props);
		Firebase.initializeApp(config);

		this.state = {
			biscuitCount: 1
		};
	}
	
	componentDidMount() {
		this.getBiscuitCount();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) {
		this.writeBiscuitCount();
		}
	}
	
	writeBiscuitCount = () => {
		Firebase.database()
		.ref("/")
		.set(this.state);
		console.log("DATA SAVED");
	};
	
	getBiscuitCount = () => {
		let ref = Firebase.database().ref("/");
		ref.on("value", snapshot => {
		const state = snapshot.val();
		this.setState(state);
		});
		this.checkBiscuitCount();
	};


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
						<OrderForm
							biscuitCount={this.state.biscuitCount}
							setState={(parameter) => {this.setState(parameter)}}/>
					</div>

					</div>
				<BottomNav />

				</div>

		)
	}
}

export default Home;