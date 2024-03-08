import { Alert } from "react-bootstrap";

import React from "react";

const Message = ({ varient, children }) => {
  return <Alert varient={varient}>{children}</Alert>;
};

Message.defaultProps = {
  varient: "info",
};

export default Message;
