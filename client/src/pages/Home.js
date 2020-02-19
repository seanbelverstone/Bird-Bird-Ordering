import React, { Component } from "react";
import biscuits from "../images/dozenbiscuitsflip.jpg";



class Home extends Component {
	
	
	render() {
		return(
			<div className="container">
				<div className="row">
					<div className="col-12">
						<button>Employee Login</button>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div>BISCUITS BY THE DOZEN</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<img src={biscuits} alt="a dozen biscuits" />
					</div>
				</div>



			</div>
		)
	}
}

export default Home;