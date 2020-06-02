import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import UserForm from "../UserForm";
import "./style.css";

const PaymentModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => {
    // Extra validation to check if there is an error with the custom tip box.
    if (!isNaN(props.tipValidation)) {
      setModal(!modal);
    } else {
      setModal(modal)
    }
  }

  return (
    <div>
      <Button type="submit" onClick={toggle} id="continueButton">{buttonLabel}Continue</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} backdrop="static" keyboard={false}>
        <ModalHeader toggle={toggle}>Contact & Payment</ModalHeader>
        <ModalBody>
          <div id="subtotal">Your subtotal is ${props.total}</div>

          <UserForm toggleClose={toggle}
                    total={props.total}
                    specialInstructions={props.specialInstructions}
                    pickupDateTime={props.pickupDateTime}
                    quantity={props.quantity}
                    jamSelected={props.jamSelected}
                    gravySelected={props.gravySelected}
                    />
          
          <br />

        </ModalBody>
      </Modal>
    </div>
  );
}

export default PaymentModal;