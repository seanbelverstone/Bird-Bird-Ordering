import React from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import {Button} from "reactstrap";
import API from "../../../utils/API";
import emailjs from "emailjs-com";

let templateParams = {};
const completed = 0;

const CheckoutForm = (props) => {

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        // Include any additional collected billing details.
        name: props.name,
        email: props.email,
      },
    });

    handlePaymentMethodResult(result);
  };

  const handlePaymentMethodResult = async (result) => {
    if (result.error) {
      showErrorMessage();
      // An error happened when collecting card details,
      // show `result.error.message` in the payment form.
    } else {
      // Otherwise send paymentMethod.id to your server (see Step 3)
      // loading symbol appears
      props.setState({
        loading: true,
        errors: false
      });
      const response = await fetch('/stripe/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payment_method_id: result.paymentMethod.id,
        }),
      });

      const serverResponse = await response.json();

      handleServerResponse(serverResponse);
    }
  };

  const handleServerResponse = (serverResponse) => {
    if (serverResponse.error) {
      showErrorMessage();

      // An error happened when charging the card,
      // show the error in the payment form.
    } else if (serverResponse.requiresAction) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        serverResponse.clientSecret
      ).then(function(result) {
        if (result.error) {
          // Show `result.error.message` in payment form
          showErrorMessage();

        } else {
          // The card action has been handled
          // The PaymentIntent can be confirmed again on the server
          fetch('/stripe/charge', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment_intent_id: result.paymentIntent.id })
          }).then(function(confirmResult) {
            return confirmResult.json();
          }).then(handleServerResponse);
        }
      });
      } else {
        // Show a success message
        props.setState({
          showSuccess: true
        })
        createOrder()
    }
  };

  const createOrder = () => {
    API.createOrder(
      props.name, 
      props.telephone, 
      props.email, 
      props.quantity,
      props.jamSelected,
      props.gravySelected,
      props.total,
      props.pickupDateTime,
      completed,
      props.specialInstructions,
      ).then(response => {
        console.log(response)

        // Stores the response data into the templateParams variable, allowing us to send an email with the 
        // relevant information to the user
        templateParams = {
          name: response.data.name,
          email: response.data.email,
          telephone: response.data.telephone,
          specialInstructions: response.data.specialInstructions,
          orderNumber: response.data.id,
          quantity: response.data.biscuitQuantity,
          jam: response.data.jam,
          gravy: response.data.gravy,
          pickupDateTime: response.data.pickupDateTime,
          total: response.data.totalCost,
          timePlaced: response.data.createdAt
        };
        console.log(templateParams);

        // Emailjs send form function.
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, templateParams, process.env.REACT_APP_USER_ID)
          .then((response) => {
            console.log("Email successfully sent", response.status, response.text)
            // hides the loading symbol
            props.setState({
              loading: false,
            });
          }, (err) => {
            console.log("Email sending failed", err)
          });
        })
  }

  // sets the parent's state of errors to true, so the alert appears
  const showErrorMessage = () => {
    props.setState({
      errors: true,
      loading: false
    })
  }

  const handleCardChange = (event) => {
    if (event.error) {
      // Show `event.error.message` in the payment form.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement onChange={handleCardChange} />
        <Button type="submit" color="secondary" disabled={!stripe}>
          Submit Order
        </Button>
      </form>
    </div>

  );
}

export default CheckoutForm;