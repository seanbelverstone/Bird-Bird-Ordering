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
			biscuitCount: 160
		};
	}
	
	componentDidMount() {
		this.getBiscuitCount();
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevState !== this.state) {
		this.writeBiscuitCount();
		this.checkBiscuitCount();
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
		}, this.checkBiscuitCount());
	};

	// checks to see if there are any biscuits left. If they're all gone, show the soldOutArea
	checkBiscuitCount = () => {
		let orderFormContainer = document.getElementById("orderFormContainer");
		let soldOutArea = document.getElementById("soldOutArea");

		if (this.state.biscuitCount === 0) {
			orderFormContainer.style.visibility = "hidden";
			soldOutArea.style.visibility = "visible";
		} else {
			orderFormContainer.style.visibility = "visible";
			soldOutArea.style.visibility = "hidden";
			}
	}


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
							<h5 class="italic">Dinner-sized.</h5>
							<h5 class="italic">Slightly smaller than our sandwich biscuits.</h5>
							<h5 class="italic">Made for sharing.</h5>

						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<img id="biscuits" src={biscuits} alt="a dozen biscuits" />
						</div>
					</div>
					<div className="row">
						<div id="soldOutArea">
							<h1 className="soldOutMessage">That's all folks! We are sold out!</h1>
							<h2 className="soldOutMessage">Watch this space for more 6-pack events.</h2>
							<h3 className="soldOutMessage">Happy thanksgiving!</h3>
							<h3 className="soldOutMessage">-The Bird Bird Team</h3>
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