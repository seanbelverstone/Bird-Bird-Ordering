import React from "react";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./style.css";

export default class PaymentLoader extends React.Component {
   render() {
	return(
	 <Loader
		type="Oval"
		color="black"
		height={100}
		width={100}
		visible={this.props.loading}
		className="loader"
	 />
	);
   }
}