import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
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
			formControls: {
				customTip: {
					value: ""
				}
			}
			}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTip = this.addTip.bind(this);
		this.handleTipChange = this.handleTipChange.bind(this);
	}
		

	// A function for when the dropdown changes
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

	// This controls the percentage tip button amount
	addTip = (event) => {
		event.preventDefault();
		this.setState({
			tip: event.target.value
		});
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
	
	handleTipChange(event) {
		// In here i'll make a function that changes the custom tip amount text box so when the user clicks
		// the $ sign, a $ will appear and they'll be able to choose a monetary amount. If they click %,
		// they will be able to select a percentage. The validation will change depending on what they choose
		// Also, if they click back on a regular tip button, it will clear the text box, preventing for
		// multiple tips being added.

		// Set validation to only allow numbers
		// On clicking $, setState for currency selector to value $
		// if(this.state.currentySelector === "$"") {
		//		pop a lil' $ at the start of the textbox
		//		input = "currency"? (is that an option??)
		// } else {
		//  	pop a lil' % at the start of the textbox
		//		set validation to only allow 1-100
		//}
		// Maybe have another text that updates to show the opposite, eg: 10% -----> $4.33 etc
	this.setState({
		selectedOption: event.target.value
	});
	if (this.state.selectedOption === "dollars") {
		
	} else {
		
	} 
}

	handleSubmit(event) {
		event.preventDefault();
		console.log("hello")
		// Make sure to put an if statement, which asks that if there is a value in the custom tip box,
		// and the state 'hidden' is set to false, to set the 'tip' state to 0, to prevent double tipping
	}

	render() {
		return (
			<Form>
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
							{/* This <p> below will show the percentage in dollar form, for easier viewing */}
							<p className="tipAmountInDollars">{fifteenPercentTip}</p>
						</button>
						<button onClick={this.addTip} value={0.18}>
							18%
							<p className="tipAmountInDollars">{eighteenPercentTip}</p>
						</button>
						<button onClick={this.addTip} value={0.20}>
							20%
							<p className="tipAmountInDollars">{twentyPercentTip}</p>
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
									onChange={this.handleTipChange}
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
									onChange={this.handleTipChange}
									checked={this.state.selectedOption === "percentage"}/>{' '}
								%
								</Label>
							</FormGroup>
							<FormGroup>
								<Label for="customAmount" sm={2}>Enter your custom amount below</Label>
								<Input 
									type="number" 
									name="customAmount" 
									id="customAmount"
									min="0.01"
									step="0.01"
									onChange={this.handleChange}
									/>
							</FormGroup>
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




			</Form>
		);
	}
}

export default OrderForm;