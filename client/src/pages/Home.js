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
			biscuitCount: 160,
			formDisplay: {display: "block"},
			soldOutDisplay: {display: "none"}
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

	// checks to see if there are any biscuits left. If they're all gone, show the soldOutArea
	checkBiscuitCount = () => {
		if (this.state.biscuitCount <= 0) {
			this.setState({
				formDisplay: {display: "none"},
				soldOutDisplay: {display: "block"}
			})
		} else {
			this.setState({
				formDisplay: {display: "block"},
				soldOutDisplay: {display: "none"}
			})
		}
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
							displayNone={this.state.formDisplay}
							biscuitCount={this.state.biscuitCount}
							setState={(parameter) => {this.setState(parameter)}}/>
						<div className="soldOutArea" style={this.state.soldOutDisplay}>
							<h1>That's all folks! We are sold out!</h1>
							<h2>Watch this space for more 6-pack events.</h2>
							<h3>Happy thanksgiving!</h3>
							<h3>-The Bird Bird Team</h3>
						</div>

					</div>

					</div>
				<BottomNav />

				</div>

		)
	}
}

export default Home;