import React from "react";
import PropTypes from "prop-types";

const List = ({ list }) => {
  return (
    <ul className="list-disc ml-8 mt-4">
      {list.map((data, index) => (
        <li key={index}>{data}</li>
      ))}
    </ul>
  );
};

List.propTypes = {
  list: PropTypes.array,
};

export default List;
