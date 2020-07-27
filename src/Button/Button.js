import React from "react";
import "./Button.scss";
export default function Button(props) {
  let { title, type, action, disable } = props;
  return (
    <button
      type="button"
      className={"button " + type}
      onClick={action}
      disabled={disable || false}
    >{title}</button>
  );
}
