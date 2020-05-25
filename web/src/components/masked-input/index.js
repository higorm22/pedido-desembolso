import React, { useEffect, useRef } from "react";

import $ from "jquery";
import mask from "jquery-mask-plugin";

const MaskedInput = ({ maskString, isReverse, onChange, ...props }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    console.log('ASDFADSF');
    var reverse = { reverse: false };

    if (isReverse) {
      reverse = { reverse: true };
    }
    let hasMask = maskString && maskString.length > 0;

    if(hasMask){
      $(inputRef.current).mask(maskString, reverse);
    }
  }, []);

  return (
    <input
      type="text"
      className="form-control"
      placeholder={props.placeholder}
      name={props.name}
      onChange={onChange}
      ref={inputRef}
    ></input>
  );
};
export default MaskedInput;
