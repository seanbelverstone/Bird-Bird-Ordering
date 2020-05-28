import React from 'react';
import { Button } from 'reactstrap';

class CompleteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orderComplete: false
		}
		this.isOrderComplete = this.isOrderComplete.bind(this);
	}

	isOrderComplete = () => {
		switch(this.state.orderComplete) {
			case true:
				return(<Button color="warning" onClick={this.handleComplete}>Mark as Incomplete</Button>);
			default:
				return(<Button color="success" onClick={this.handleComplete}>Complete Order</Button>)
		}
	}

	handleComplete = () => {
		console.log("Button clicking yay")
		this.setState({
			orderComplete: !this.state.orderComplete
		})
	}

	render() {	
		return (
			<div>
				{this.isOrderComplete()}
			</div>
			);
		}
}

export default CompleteButton;