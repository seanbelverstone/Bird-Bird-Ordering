import React from 'react';
import { Button } from 'reactstrap';
import API from "../../../utils/API";

class CompleteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: ""
		}
		this.isOrderComplete = this.isOrderComplete.bind(this);
	}

	componentDidMount = () => {
		let id = this.props.title.split("#");
		id = id[1];
		console.log(id);
		this.setState({
			id: id
		});
	}

	isOrderComplete = () => {

		switch(this.props.orderComplete === 1) {
			case true:
				return(<Button color="warning" onClick={this.handleComplete}>Mark as Incomplete</Button>);
			default:
				return(<Button color="success" onClick={this.handleComplete}>Complete Order</Button>)
		}
	}

	handleComplete = () => {
		API.updateComplete(this.state.id, this.props.orderComplete)
		.then(response => {
			console.log(response);
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