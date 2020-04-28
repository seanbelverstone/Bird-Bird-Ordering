import React, { useState } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from 'react-stripe-elements';
import axios from 'axios';
import "./CheckoutForm.scss";

const CheckoutForm = (props, stripe) => {
	  
	const [receiptUrl, setReceiptUrl] = useState('')
  
	const handleSubmit = async event => {
	  event.preventDefault()
  
	  const { token } = await stripe.createToken()
  
	  const order = await axios.post('http://localhost:3000/api/stripe/charge', {
		amount: props.total,
		source: token.id,
		receipt_email: 'customer@example.com'
	  })
  
	  setReceiptUrl(order.data.charge.receipt_url)
	}

	if (receiptUrl) {
		return (
		  <div className="success">
			<h2>Payment Successful!</h2>
			<a href={receiptUrl}>View Receipt</a>
		  </div>
		)
	  }

	return (
	<div className="checkout-form">
		<p>Amount: ${props.total}</p>
		<form onSubmit={handleSubmit}>
		<label>
			Card details
			<CardNumberElement />
		</label>
		<label>
			Expiration date
			<CardExpiryElement />
		</label>
		<label>
			CVC
			<CardCVCElement />
		</label>
		<button type="submit" className="order-button">
			Pay
		</button>
		</form>
	</div>
	)
}
	
	export default injectStripe(CheckoutForm)