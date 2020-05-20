import React from "react";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

export default class PaymentLoader extends React.Component {
   render() {
	return(
	 <Loader
		type="ThreeDots"
		color="#00BFFF"
		height={100}
		width={100}
		visible={this.props.loading}
	 />
	);
   }
}