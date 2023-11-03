import React from 'react';
import { FormGroup, Label, Row, Col, Input, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
// Commented out the two below as they're not currently being used
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
import UserCalendar from "../UserCalendar";
import PaymentModal from "../PaymentModal";
import "./style.css";


var totalPrice = 20;
var quantityPrice = 20;
var fifteenPercentTip;
var eighteenPercentTip;
var twentyPercentTip;
// Using this disabler because I am using the customPercentage amount later
// eslint-disable-next-line
var customPercentageAmount;
var tax;
var subtotal;
var finalTotal;

class OrderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			quantity: 1,
			jamSelected: 0,
			gravySelected: 0,
			jamStyle: {},
			gravyStyle: {},
			sides: 0,
			hiddenForm: {visibility: "hidden"},
			hidden: true,
			tipInDollars: "",
			tipInPercentage: 0,
			buttonTip: "",
			values: [],
			validated: true,
			pickupDateTime: new Date(2023, 10, 22, 9),
			orderCompleted: false,
			remainingBiscuits: this.props.biscuitCount
			}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTip = this.addTip.bind(this);
		this.handleCalendarChange = this.handleCalendarChange.bind(this);

	}

	componentDidMount() {
		customPercentageAmount = this.state.tipInDollars;
	}
	
	// A function for when the quantity changes
	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(
		  {
			[name]: value,
			// clear the value of the tip when the quantity changes
			...(name === 'quantity' ? {
				buttonTip: '',
				tipInDollars: ''
			}: {}),
			// clear the button that's been selected if we use a custom tip
			...(name === 'tipInDollars' ? {
				buttonTip: ''
			} : {})
		}
		)
	};

	handleTotals = () => {
		quantityPrice = parseFloat(this.state.quantity)*20;
		totalPrice = quantityPrice + this.state.sides;
		// The code below works out the percentage of tip into actual dollars, rounded to 2 decimal places.
		fifteenPercentTip = (totalPrice * 0.15).toFixed(2);
		eighteenPercentTip = (totalPrice * 0.18).toFixed(2);
		twentyPercentTip = (totalPrice * 0.2).toFixed(2);
	};

	// Handling tip function

	addTip = (event) => {
		event.preventDefault();

		switch (event.target.value) {
			// This switch case sets the tip amount to reflect the button pressed, and clears the
			// custom amount to prevent double tipping
			case "0.15":
				this.setState({
					buttonTip: "0.15",
					tipInDollars: fifteenPercentTip,
				})
				break;
			case "0.18":
				this.setState({
					buttonTip: "0.18",
					tipInDollars: eighteenPercentTip,
				})
				break;
			case "0.2":
				this.setState({
					buttonTip: "0.2",
					tipInDollars: twentyPercentTip,
				})
				break;
			default:
				console.log("no tip selected");

		}
	}

	// Hidden tip input functions

	// This waits until a user selects the Custom Amount button. If they do, it reveals a hidden section
	// of the form where they can choose to enter an amount using $
	handleForm = (event) => {
		event.preventDefault()
		if (this.state.hidden) {
			this.showForm()
			this.setState({
				buttonTip: '',
				tipInDollars: ''
			})
		} else {
			this.hideForm()
		}
	}

	showForm = () => {
		this.setState({
				hiddenForm: {  
					visibility: "visible",
					opacity: 1,
					transition: "visibility 0.5s, opacity 0.5s ease"
				},
				hidden: false
			})
	}

	hideForm = () => {
		this.setState({

			hiddenForm: {  
				visibility: "hidden",
				opacity: 0,
				transition: "visibility 0.5s, opacity 0.5s ease"
			},
			hidden: true
		})
	}

	// Calendar based functions
	// Changes the state based on user input
	handleCalendarChange = date => {
		this.setState({
			pickupDateTime: date
		});
	  };

	// End-of-form functions
	handleSubtotal = () => {
		subtotal = (totalPrice + parseFloat(this.state.tipInDollars)).toFixed(2);
		if (isNaN(subtotal)) {
			subtotal = totalPrice;
		} 			
		return subtotal;
	}

	handleTax = () => {
		tax = parseFloat(totalPrice * 0.0825).toFixed(2);
		return tax;
		}

	handleFinalTotal = () => {
		finalTotal = (parseFloat(this.handleSubtotal()) + parseFloat(tax)).toFixed(2);
		console.log(parseFloat(this.handleSubtotal()) + parseFloat(tax));
		return finalTotal;
	}

	handleSubmit(event, values) {
		// event.preventDefault();
		this.setState({values});

		if (this.state.values.length > 0) {
			this.setState({
				validated: false
			});
			return;
		} else {
			this.setState({
				validated: true
			});	
			return false;	
		}
	}

	render() {
		return (
			<AvForm style={this.props.displayNone} onSubmit={this.handleSubmit} id="orderForm">
				<Row form id="quantityAndPrice">
					<Col>
						<FormGroup style={{width: "97%"}}>
							<Label for="quantity">Number of 6-Packs</Label>
							<Input 
								type="select" 
								name="quantity" 
								id="quantity" 
								value={this.state.quantity}
								onChange={this.handleChange}
								onClick={this.handleTotals()}>

								<option value="1">1 (6 biscuits)</option>
								<option value="2">2 (12 biscuits)</option>
								<option value="3">3 (18 biscuits)</option>
								<option value="4">4 (24 biscuits)</option>
								<option value="5">5 (30 biscuits)</option>
								<option value="6">6 (36 biscuits)</option>


							</Input>
						</FormGroup>
					</Col>
					<Col>
						<Label for="price">Price</Label>
						<div id="price" name="price">${quantityPrice}</div>
					</Col>
				</Row>
				<hr className="lineBreak"/>
				<Row>
					<Col>
						<div id="tipTitle">Add a tip</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button className="tipButtons" color={this.state.buttonTip === '0.15' ? "primary" : "secondary"} onClick={this.addTip} value={0.15}>
							15%
							<br />
							${fifteenPercentTip}
						</Button>
						<Button className="tipButtons" color={this.state.buttonTip === '0.18' ? "primary" : "secondary"} onClick={this.addTip} value={0.18}>
							18%
							<br />
							${eighteenPercentTip}
						</Button>
						<Button className="tipButtons" color={this.state.buttonTip === '0.2' ? "primary" : "secondary"} onClick={this.addTip} value={0.20}>
							20%
							<br />
							${twentyPercentTip}
						</Button>
						<Button
							className="tipButtons" color={this.state.hiddenForm.visibility === 'visible' ? "primary" : "secondary"} onClick={this.handleForm}>Custom Amount</Button>

						<div id="hiddenForm" style={this.state.hiddenForm}>
							<AvGroup className="input-group">
									<AvInput 
										type="text" 
										name="tipInDollars" 
										id="tipInDollars"
										min="0.01"
										step="0.01"
										validate={{pattern: {value: /^\$?[0-9]+\.?[0-9]?[0-9]?$/}}}
										onChange={this.handleChange}
										value={this.state.tipInDollars}
									/>
								<InputGroupAddon addonType="prepend">
									<InputGroupText>
										{customPercentageAmount = (this.state.tipInDollars / (totalPrice / 100)).toFixed(2)}%
									</InputGroupText>
								</InputGroupAddon>
								<AvFeedback>
								Please enter a valid tip amount in dollars
								</AvFeedback>
							</AvGroup>
						</div>
					</Col>
					</Row>
					<hr className="lineBreak"/>
					<Row>
						<Col>
							<div>Select a pick-up date & time</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<UserCalendar pickupDateTime={this.state.pickupDateTime}
										handleCalendarChange={this.handleCalendarChange}/>
						</Col>
					</Row>
					<hr className="lineBreak"/>
					<div className="totalArea">
						<Row>
							<Col>
								<div id="subtotal">Subtotal: <p className="totalsText">${this.handleSubtotal()}</p></div>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<div id="tax">Tax: <p className="totalsText">${this.handleTax()}</p></div>
							</Col>
						</Row>
						<hr />
						<Row>
							<Col>
								<div id="finalTotal">Total: <p className="totalsText">${this.handleFinalTotal()}</p></div>
							</Col>
						</Row>
					</div>
					<Row>
						<Col>
							<FormGroup>
									<PaymentModal
										tipValidation={this.state.tipInDollars}
										total={finalTotal}
										values={this.state.values}
										pickupDateTime={this.state.pickupDateTime}
										quantity={this.state.quantity}
										jamSelected={this.state.jamSelected}
										gravySelected={this.state.gravySelected}
										biscuitCount={this.props.biscuitCount}
										setState={this.props.setState}
										/>
							</FormGroup>
						</Col>
					</Row>
			</AvForm>
		);
	}
}

export default OrderForm;
