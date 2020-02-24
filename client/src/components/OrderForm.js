import React from 'react';
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import UserCalendar from "./UserCalendar";


var totalPrice = 30;

class OrderForm extends React.Component {

	state = {
		quantity: 1,
		hiddenForm: {display: "none"},
		hidden: true
	}

	handleChange = (event) => {
		const {name, value} = event.target;
		this.setState(
		  {[name]: value}
		)
	  };

	componentDidUpdate = () => {
		this.handleTotal(this.state.quantity)
	}

	handleTotal = (quantity) => {
		totalPrice = parseInt(this.state.quantity)*30
	};

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
								on={this.handleTotal(this.state.quantity)}>

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
						<button>15%</button>
						<button>18%</button>
						<button>20%</button>
						<button
							onClick={this.handleForm}>Custom Amount</button>

						<div id="hiddenForm" style={this.state.hiddenForm}>
							<FormGroup check>
								<Label check>
								<Input type="radio" name="radio2" />{' '}
								$
								</Label>
							</FormGroup>
							<FormGroup check>
								<Label check>
								<Input type="radio" name="radio2" />{' '}
								%
								</Label>
							</FormGroup>
							<FormGroup>
								<Label for="customAmount" sm={2}>Enter your custom amount below</Label>
								<Input type="number" name="customAmount" id="customAmount" />
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
					<button id="next">NEXT</button>
				</Row>




			</Form>
		);
	}
}

export default OrderForm;