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
	}

	componentDidMount = () => {
			let id = this.props.title.split("#");
			this.setState({
				id: id[1]
			}, () => {
				API.getOneOrder(this.state.id)
				.then(response => {
					console.log(response.data);
					this.isOrderComplete(response.data);
			})
		});

	}

	isOrderComplete = (completedVariable) => {
		parseInt(completedVariable);
		console.log(completedVariable);
		
		switch(completedVariable === 1) {
			case true:
				this.setState({
					renderedButton: <Button color="warning" onClick={() => this.handleComplete(this.state.id, completedVariable)}>Mark as Incomplete</Button>,
					trueOrFalse: 0
				})
				break;
			default:
				this.setState({
					renderedButton: <Button color="success" onClick={() => this.handleComplete(this.state.id, completedVariable)}>Complete Order</Button>,
					trueOrFalse: 1
				});		
				break;		
		}
	}

	handleComplete = (id, completed) => {
		API.updateComplete(id, completed)
		.then(response => {

			this.isOrderComplete(response.data[0]);
			API.getAllOrders();
		});
	}

	render() {	
		return (
			<div>
				{this.state.renderedButton}
			</div>
			);
		}
}

export default CompleteButton;