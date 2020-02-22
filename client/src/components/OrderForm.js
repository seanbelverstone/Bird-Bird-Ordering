import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';


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
				<Row form>
					<Col xl={3}>
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
					<Col xl={3}>
						<Label for="price">Price</Label>
						<div id="price" name="price">$30.00</div>
					</Col>
					<Col xl={3}>
						<Label for="totalPrice">Total</Label>
						<div id="totalPrice" name="totalPrice">${totalPrice}</div>
					</Col>
				</Row>
				<Row>
					<Col xl={12}>
						<button>15%</button>
						<button>18%</button>
						<button>20%</button>
						<FormGroup>
						<Label for="customAmount">Custom Amount</Label>
							<Input 
								type="select" 
								name="customAmount" 
								id="customAmount" 
								style={{width: "60px"}}>
									<option>$</option>
									<option>%</option>
							</Input>
							<Input
								type="number"
								name="customText"
								id="customText">
							</Input>
						</FormGroup>

					</Col>
				</Row>




			</Form>
		);
	}
}

export default OrderForm;