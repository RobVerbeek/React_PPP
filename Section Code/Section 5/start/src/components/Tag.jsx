import React from "react";

import "./Tag.css";

const Tag = ({ tagName }) => {
  return (
    <button type="button" className="tag">
      {tagName}
    </button>
  );
};

export default Tag;
