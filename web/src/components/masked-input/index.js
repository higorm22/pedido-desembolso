import React, { useState, useEffect, useRef } from "react";

import $ from "jquery";
import mask from "jquery-mask-plugin";

const MaskedInput = ({ maskString, isReverse, onChange, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    var reverse = { reverse: false };

    if (isReverse) {
      reverse = { reverse: true };
    }
    $(inputRef.current).mask(maskString, reverse);
  }, []);

  return (
    <input
      type="text"
      data-mask="00/00/0000"
      className="form-control"
      placeholder={props.placeholder}
      name={props.name}
      onChange={onChange}
      ref={inputRef}
    ></input>
  );
};
export default MaskedInput;
