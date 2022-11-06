import React, { Component } from "react";
import { Button } from "reactstrap";
import './style.css';

class DownloadButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	
	render() {
		return (
			<Button id="download" color="primary">Download</Button>
		);
	}
}

export default DownloadButton;