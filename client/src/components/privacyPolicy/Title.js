import React from "react";
import PropTypes from "prop-types";

const Title = ({ title }) => {
  return <h1 className="text-2xl my-2">{title}</h1>;
};

Title.propTypes = {
  title: PropTypes.string,
};

export default Title;
