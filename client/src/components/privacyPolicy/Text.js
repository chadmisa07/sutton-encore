import React from "react";
import PropTypes from "prop-types";

const Text = ({ text, withTopMargin = true }) => {
  return <p className={withTopMargin ? "mt-4" : ""}>{text}</p>;
};

Text.propTypes = {
  text: PropTypes.string,
  withTopMargin: PropTypes.bool,
};

export default Text;
