import React from 'react';
import { FormGroup, Label, Row, Col, Input, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation';
import addDays from "date-fns/subDays";
// Commented out the two below as they're not currently being used
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";
import UserCalendar from "../UserCalendar";
import PaymentModal from "../PaymentModal";
import "./style.css";


var totalPrice = 30;
var quantityPrice = 30;
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
			hiddenForm: {display: "none"},
			hidden: true,
			tipInDollars: "",
			tipInPercentage: 0,
			buttonTip: "",
			values: [],
			validated: true,
			specialInstructions: "",
			// Adding in this ternary operator here. Normally it would be just new Date() but for the thanksgiving event, it's changing.
			// if today's date is later than the 23rd and earlier than the 27th, set the new date to be today's date + 2. This will prevent
			// users for placing orders on the same day, giving the team a 2 day headstart. If it returns false, set the initial date to Nov 23rd @ 8am
			pickupDateTime: new Date() > new Date(2020, 10, 23, 8) && new Date() < new Date(2020, 10, 27) ? addDays(new Date(), 2) : new Date(2020, 10, 23, 8),
			orderCompleted: false
			}

		this.handleChange = this.handleChange.bind(this);
		this.selectJam = this.selectJam.bind(this);
		this.selectGravy = this.selectGravy.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.addTip = this.addTip.bind(this);
		this.handleCalendarChange = this.handleCalendarChange.bind(this);

	}
	
	// A function for when the quantity changes
	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(
		  {[name]: value}
		)
	};

	handleTotals = () => {
		quantityPrice = parseFloat(this.state.quantity)*30;
		totalPrice = quantityPrice + this.state.sides;
		// The code below works out the percentage of tip into actual dollars, rounded to 2 decimal places.
		fifteenPercentTip = (totalPrice * 0.15).toFixed(2);
		eighteenPercentTip = (totalPrice * 0.18).toFixed(2);
		twentyPercentTip = (totalPrice * 0.2).toFixed(2);
	};

	// Selecting jam or gravy. This updates the state called sides, to calculate how much this extra addition
	// will cost, and it also changes the style of the button to indicate it has been selected.
	selectJam = (event) => {
		var sides = this.state.sides;
		var jamValue = parseInt(event.target.value);

		if (this.state.jamSelected === 0) {
			this.setState({
				jamSelected: 1,
				sides: sides + jamValue,
				jamStyle: {
					border: "goldenrod 5px solid",
					boxShadow: "rgb(150, 114, 22) 4px 4px"
				}				
			});
		} else {
			this.setState({
				jamSelected: 0,
				sides: sides - jamValue,
				jamStyle: {
					border: "none",
					boxShadow: "none"
				}				
			});
		}
	}

	selectGravy = (event) => {
		var sides = this.state.sides;
		var gravyValue = parseInt(event.target.value);

		if (this.state.gravySelected === 0) {
			this.setState({
				gravySelected: 1,
				sides: sides + gravyValue,
				gravyStyle: {
					border: "goldenrod 6px solid",
					boxShadow: "rgb(150, 114, 22) 4px 4px"
				}
			});
		} else {
			this.setState({
				gravySelected: 0,
				sides: sides - gravyValue,
				gravyStyle: {
					border: "none",
					boxShadow: "none"
				}
			});
		}
	}

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

	// Calendar based functions
	handleCalendarChange = date => {
		this.setState({
			pickupDateTime: date
		});
	  };

	  
	componentDidMount() {
		// set the date 2 days in the future
		// Commenting this out as is not required for thanksgiving event

		// var initialDate = addDays(new Date(), 2);
		// // set the time to 8am
		// initialDate = setHours(setMinutes(initialDate, 0), 8);
		// this.setState({
		// 	pickupDateTime: initialDate
		// });
		customPercentageAmount = this.state.tipInDollars;
	}

	// End-of-form functions
	handleSubtotal = () => {
		subtotal = (totalPrice + parseFloat(this.state.tipInDollars)).toFixed(2);
		if (isNaN(subtotal)) {
			subtotal = totalPrice;
		} 			
		return subtotal;
	}

	handleTax = () => {
		tax = parseFloat(subtotal * 0.0625).toFixed(2);
		return tax;
		}

	handleFinalTotal = () => {
		finalTotal = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
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
			<AvForm onSubmit={this.handleSubmit} id="orderForm">
				<Row form id="quantityAndPrice">
					<Col>
						<FormGroup style={{width: "97%"}}>
							<Label for="quantity">Quantity</Label>
							<Input 
								type="select" 
								name="quantity" 
								id="quantity" 
								value={this.state.quantity}
								onChange={this.handleChange}
								onClick={this.handleTotals()}>

								<option value="0.5">half dozen</option>
								<option value="1">1 dozen</option>
								<option value="1.5">1 and a half dozens</option>
								<option value="2">2 dozens</option>
								<option value="2.5">2 and a half dozens</option>
								<option value="3">3 dozens</option>
								<option value="3.5">3 and a half dozens</option>
								<option value="4">4 dozens</option>

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
						<div>Add Jam</div>
					</Col>
					<Col>
						<div>Add Gravy</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<button 
							alt="Jam"  
							className="jamGravyImages"
							id="jam"
							onClick={this.selectJam} 
							selected={this.state.jamSelected}
							style={this.state.jamStyle}
							value={15}
							disabled
							>
						<p id="jamText">COMING SOON</p>
						</button>
					</Col>
					<Col>
						<button 
							alt="Gravy"  
							className="jamGravyImages"
							id="gravy" 
							onClick={this.selectGravy} 
							selected={this.state.gravySelected}
							style={this.state.gravyStyle}
							value={15}
						>
						</button>
					</Col>
				</Row>
				<hr className="lineBreak"/>
				<Row>
					<Col>
						<div>Add a tip</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button className="tipButtons" color="secondary" onClick={this.addTip} value={0.15}>
							15%
							<br />
							${fifteenPercentTip}
						</Button>
						<Button className="tipButtons" color="secondary" onClick={this.addTip} value={0.18}>
							18%
							<br />
							${eighteenPercentTip}
						</Button>
						<Button className="tipButtons" color="secondary" onClick={this.addTip} value={0.20}>
							20%
							<br />
							${twentyPercentTip}
						</Button>
						<Button
							className="tipButtons" color="secondary" onClick={this.handleForm}>Custom Amount</Button>

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
					<Row>
						<Col>
							<FormGroup>
								<Label for="specialInstructions" className="specialInstructions">Would you like to include any special instructions?</Label>
								<Input type="textarea" name="specialInstructions" id="specialInstructions" onChange={this.handleChange} />
							</FormGroup>
						</Col>
					</Row>
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
										specialInstructions={this.state.specialInstructions}
										pickupDateTime={this.state.pickupDateTime}
										quantity={this.state.quantity}
										jamSelected={this.state.jamSelected}
										gravySelected={this.state.gravySelected}
										/>
							</FormGroup>
						</Col>
					</Row>
			</AvForm>
		);
	}
}

export default OrderForm;