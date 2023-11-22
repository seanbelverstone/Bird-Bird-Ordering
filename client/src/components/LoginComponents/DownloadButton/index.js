import React, { Component } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "reactstrap";
import * as XLSX from 'xlsx';
import './style.css';

class DownloadButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false
		}
	}

	componentDidMount() {
		this.setState({
			disabled: this.filterData().length === 0
		})
	}

	componentDidUpdate(prevProps) {
		const { rawData = [], selectedMonth, selectedYear } = this.props;
		if (prevProps.selectedMonth !== selectedMonth || prevProps.selectedYear !== selectedYear
			|| prevProps.rawData.toString() !== rawData.toString()) {
			this.setState({
				disabled: this.filterData().length === 0
			});
		}
	}

	filterData = () => {
		const { rawData = [], selectedMonth, selectedYear } = this.props;
		const filteredData = rawData.length > 0 ? rawData.filter((datum) => {
			return format(parseISO(datum.pickupDateTime), 'MMM') === selectedMonth &&
			format(parseISO(datum.pickupDateTime), 'yyyy') === selectedYear
		}) : [];
		return filteredData;
	}

	downloadData = () => {
		const list = [];
		const filteredData = this.filterData();
		for (var i = 0; i < filteredData.length; i++) {
			list.push({
				'Order Number': filteredData[i].id,
				'Name': filteredData[i].name,
				'Email': filteredData[i].email,
				'Telephone': filteredData[i].telephone,
				'Quantity': parseInt(filteredData[i].biscuitQuantity),
				'Total Cost': `$${filteredData[i].totalCost}`,
				'Pick Up Date': format(parseISO(filteredData[i].pickupDateTime), 'MM/dd/yyyy'),
				'Pick Up Time': format(parseISO(filteredData[i].pickupDateTime), 'h:mm a'),
			})
		}
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(list);
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Thanksgiving Sheet');
		XLSX.writeFile(workbook, 'ThanksgivingOrders.xls');
	}
	
	render() {
		return (
			<Button id="download" color="primary" onClick={this.downloadData} disabled={this.state.disabled}>Download</Button>
		);
	}
}

export default DownloadButton;