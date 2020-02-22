import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



class OrderForm extends React.Component {

	state = {
		quantity: 1,
		totalPrice: 0
	}

	render() {
		return (
			<Form>
			<FormGroup style={{width: "150px"}}>
				<Label for="exampleSelect">Quantity</Label>
				<Input type="select" name="select" id="quantity" value={this.state.quantity}>
				<option value="1">1 dozen</option>
				<option value="2">2 dozens</option>
				<option value="3">3 dozens</option>
				<option value="4">4 dozens</option>
				</Input>
				<div>Price</div>
				<div>$30.00</div>
				<div>Total</div>
				<div id="totalPrice">{this.state.totalPrice}</div>
			</FormGroup>
			</Form>
		);
	}
}

export default OrderForm;