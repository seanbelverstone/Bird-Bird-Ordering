import React, { useState } from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const ToastSuccess = (props) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <div>
      <Toast>
        <ToastHeader toggle={toggle}>Toast title</ToastHeader>
        <ToastBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ToastBody>
      </Toast>
    </div>
  );
}

export default ToastSuccess;