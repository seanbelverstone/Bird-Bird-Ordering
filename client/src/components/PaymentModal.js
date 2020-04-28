import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UserForm from "./UserForm";

const PaymentModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => {
    // Extra validation to check if there is an error with the custom tip box.
    if (!isNaN(props.tipValidation)) {
      setModal(!modal);
    } else {
      setModal(modal)
    }
  }
  const toggleNested = () => {
    console.log(props.values.length)
    if (props.values.length === 0) {
      setNestedModal(!nestedModal);
      setCloseAll(false);
    }

  }
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  }

  return (
    <div>
      <Button type="submit" onClick={toggle}>{buttonLabel}NEXT</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Contact & Payment</ModalHeader>
        <ModalBody>
          Your subtotal is ${props.total}

          <UserForm handleSubmit={props.handleSubmit}
                    toggleNested={toggleNested}
                    values={props.values}/>
          
          <br />
          <Button color="success" onClick={toggleNested}>Show Nested Modal</Button>
          <Modal isOpen={nestedModal} toggle={toggleNested} onClosed={closeAll ? toggle : undefined}>
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>Stuff and things</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggleNested}>Done</Button>{' '}
              <Button color="secondary" onClick={toggleAll}>All Done</Button>
            </ModalFooter>
          </Modal>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PaymentModal;