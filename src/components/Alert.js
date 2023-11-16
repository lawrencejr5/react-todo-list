import React from "react";

const Alert = ({ type, text }) => {
  return <span className={`my-alert alert-${type}`}>{text}</span>;
};

export default Alert;
