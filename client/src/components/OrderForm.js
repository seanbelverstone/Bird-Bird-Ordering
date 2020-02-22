import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


var totalPrice = 30;

class OrderForm extends React.Component {

	state = {
		quantity: 1,
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
	

	render() {
		return (
			<Form>
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

				<Label for="price">Price</Label>
				<div id="price" name="price">$30.00</div>
				<Label for="totalPrice">Total</Label>
				<div id="totalPrice" name="totalPrice">${totalPrice}</div>

			</FormGroup>
			</Form>
		);
	}
}

export default OrderForm;