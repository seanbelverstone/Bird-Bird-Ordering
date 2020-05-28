import React from 'react';
import { Button } from 'reactstrap';

const Example = (props) => {

	isOrderComplete = () => {
		switch(props.orderComplete) {
			case true:
				return(<Button color="warning">Mark as Incomplete</Button>);
			default:
				return(<Button color="success">Complete Order</Button>)
		}
	}


	return (
		<div>
			{isOrderComplete()}
		</div>
	);
}

export default Example;