import React from 'react';
import { Button } from 'reactstrap';
import API from "../../../utils/API";

class CompleteButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: "",
			renderedButton: "",
			trueOrFalse: ""
		}
		this.isOrderComplete = this.isOrderComplete.bind(this);
		this.updateButton = this.updateButton.bind(this);
	}

	componentDidMount = () => {
		let id = this.props.title.split("#");
		this.setState({
			id: id[1],
			trueOrFalse: this.props.orderComplete
		});
	}

	isOrderComplete = (completedVariable) => {

		if(completedVariable === "1") {
			this.setState({
				trueOrFalse: 0
			})
			return <Button color="warning" onClick={() => this.updateButton()}>Mark as Incomplete</Button>
		} else {
			return <Button color="success" onClick={() => this.updateButton()}>Complete Order</Button>		
		}
	}

	updateButton = () => {

		API.updateComplete(this.state.id, this.state.trueOrFalse)
		.then(response => {
			console.log(response);
			this.setState({
				trueOrFalse: response.data.completed
			}/*, this.isOrderComplete(this.state.trueOrFalse)*/);
		});
	}

	render() {	
		return (
			<div>
				{this.isOrderComplete(this.state.trueOrFalse)}
			</div>
			);
		}
}

export default CompleteButton;