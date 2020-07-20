import React from "react";
import "./Button.scss";
export default function Button(props) {
  let { title, type, action } = props;
  return (
    <input
      type="button"
      value={title}
      className={"button " + type}
      onClick={action}
    />
  );
}
