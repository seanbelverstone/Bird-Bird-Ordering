import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "reactstrap";
import * as XLSX from 'xlsx';
import './style.css';

class DownloadButton extends Component {

	constructor(props) {
		super(props);
	}

	downloadData = () => {
		const { rawData = [] } = this.props;
		const list = [];
		for (var i = 0; i < rawData.length; i++) {
			list.push({
				'Order Number': rawData[i].id,
				'Name': rawData[i].name,
				'Email': rawData[i].email,
				'Telephone': rawData[i].telephone,
				'Quantity': parseInt(rawData[i].biscuitQuantity),
				'Total Cost': `$${rawData[i].totalCost}`,
				'Pick Up Date': format(parseISO(rawData[i].pickupDateTime), 'MM/dd/yyyy'),
				'Pick Up Time': format(parseISO(rawData[i].pickupDateTime), 'h:mm a'),
			})
		}
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(list);
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Thanksgiving Sheet');
		XLSX.writeFile(workbook, 'ThanksgivingOrders.xls');
	}
	
	render() {
		return (
			<Button id="download" color="primary" onClick={this.downloadData} disabled={this.props.rawData.length === 0}>Download</Button>
		);
	}
}

export default DownloadButton;