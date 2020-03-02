import React from 'react';
import { FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import UserCalendar from "./UserCalendar";


var totalPrice = 30;
var fifteenPercentTip;
var eighteenPercentTip;
var twentyPercentTip;

class OrderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			hiddenForm: {display: "none"},
			hidden: true,
			selectedOption: "dollars",
			selectedIcon: "$",
			customAmount: "",
			buttonTip: ""
			}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTip = this.addTip.bind(this);
		this.changeIcon = this.changeIcon.bind(this);
	}
		

	// A function for when the quantity changes
	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(
		  {[name]: value}
		)
	};

	handleTotals = () => {
		totalPrice = parseInt(this.state.quantity)*30;

		// The code below works out the percentage of tip into actual dollars, rounded to 2 decimal places.
		fifteenPercentTip = "$" + (totalPrice * 0.15).toFixed(2);
		eighteenPercentTip = "$" + (totalPrice * 0.18).toFixed(2);
		twentyPercentTip = "$" + (totalPrice * 0.2).toFixed(2);
	};

	addTip = (event) => {
		event.preventDefault();
		switch (event.target.value) {
			// This switch case sets the tip amount to reflect the button pressed, and clears the
			// custom amount to prevent double tipping
			case "0.15":
				this.setState({
					buttonTip: "0.15",
					customAmount: ""
				})
				break;

			case "0.18":
				this.setState({
					buttonTip: "0.18",
					customAmount: ""
				})
				break;

			case "0.2":
				this.setState({
					buttonTip: "0.2",
					customAmount: ""
				})
				break;

			default:
				console.log("no tip selected")


		}
	}


	// This waits until a user selects the Custom Amount button. If they do, it reveals a hidden section
	// of the form where they can choose to enter an amount using $ or %
	handleForm = (event) => {
		event.preventDefault()
		if (this.state.hidden) {
			this.showForm()
		} else {
			this.hideForm()
		}
	}

	showForm = () => {
		this.setState({
				hiddenForm: {display: "block"},
				hidden: false
			})
	}

	hideForm = () => {
		this.setState({
			hiddenForm: {display: "none"},
			hidden: true
		})
	}
	
	changeIcon(event) {
		this.setState({
			selectedOption: event.target.value
		});
	// Not sure if this is necessary yet. Commenting out for further changes. Icon is changing after opposite selection
	// 	if (this.state.selectedOption === "dollars") {
	// 		this.setState({
	// 			selectedIcon: "$"
	// 		});
	// 	} else {
	// 		this.setState({
	// 			selectedIcon: "%"
	// 		})
	// 	} 
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("hello")
		// Make sure to put an if statement, which asks that if there is a value in the custom tip box,
		// and the state 'hidden' is set to false, to set the 'tip' state to 0, to prevent double tipping
	}

	render() {
		return (
			<AvForm>
				<Row form>
					<Col>
						<FormGroup style={{width: "150px"}}>
							<Label for="quantity">Quantity</Label>
							<Input 
								type="select" 
								name="quantity" 
								id="quantity" 
								value={this.state.quantity}
								onChange={this.handleChange}
								onClick={this.handleTotals()}>

								<option value="1">1 dozen</option>
								<option value="2">2 dozens</option>
								<option value="3">3 dozens</option>
								<option value="4">4 dozens</option>

							</Input>
						</FormGroup>
					</Col>
					<Col>
						<Label for="price">Price</Label>
						<div id="price" name="price">$30.00</div>
					</Col>
					<Col>
						<Label for="totalPrice">Total</Label>
						<div id="totalPrice" name="totalPrice">${totalPrice}</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div>Add a tip</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<button onClick={this.addTip} value={0.15}>
							15%
							<br />
							{fifteenPercentTip}
						</button>
						<button onClick={this.addTip} value={0.18}>
							18%
							<br />
							{eighteenPercentTip}
						</button>
						<button onClick={this.addTip} value={0.20}>
							20%
							<br />
							{twentyPercentTip}
						</button>
						<button
							onClick={this.handleForm}>Custom Amount</button>

						<div id="hiddenForm" style={this.state.hiddenForm}>
							<FormGroup check>
								<Label check>
								<Input 
									type="radio" 
									name="radio2" 
									value="dollars" 
									onChange={this.changeIcon}
									checked={this.state.selectedOption === "dollars"}/>{' '}
								$
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
								<Input 
									type="radio" 
									name="radio2" 
									value="percentage" 
									onChange={this.changeIcon}
									checked={this.state.selectedOption === "percentage"}/>{' '}
								%
								</Label>
							</FormGroup>
								<Label for="customAmount" sm={2}>Enter your custom amount below</Label>
								{/* <p>{this.state.selectedIcon}</p> */}
									<AvField 
									type="text" 
									name="customAmount" 
									id="customAmount"
									min="0.01"
									step="0.01"
									validate={{pattern: {value: "^100$|^[0-9]{0,2}$|^[0-9]{0,2}[0-9]{1,2}?$"}}}
									onChange={this.handleChange}
									value={this.state.customAmount}
									/>
						</div>
					</Col>
				</Row>
				<Row>
					<div>Select a pick-up date & time</div>
				</Row>
				<Row>
					<UserCalendar />
				</Row>
				<Row>
				<FormGroup>
					<Label for="specialInstructions">Would you like to include any special instructions?</Label>
					<Input type="textarea" name="text" id="specialInstructions" />
				</FormGroup>
				</Row>
				<Row>
					<button id="next" onClick={this.handleSubmit}>NEXT</button>
				</Row>



			</AvForm>
		);
	}
}

export default OrderForm;