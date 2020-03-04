import React, { Component } from "react";
import { ParallaxProvider } from 'react-scroll-parallax';
import OrderForm from "../components/OrderForm";
import biscuits from "../images/dozenbiscuitsflip.jpg";



class Home extends Component {
	
	
	render() {
		return(
			<ParallaxProvider>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<button>Employee Login</button>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<h1>BISCUITS BY THE DOZEN</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<img src={biscuits} alt="a dozen biscuits" />
						</div>
					</div>
					<div className="row">
						<OrderForm />
					</div>


				</div>
			</ParallaxProvider>
		)
	}
}

export default Home;