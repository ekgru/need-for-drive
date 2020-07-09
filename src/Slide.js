import React from "react";
import Button from "./Button";
export default function Slide(props) {
  const style = { backgroundImage: props.img };
  return (
    <div className="slide" style={style}>
      <h1>{props.head}</h1>
      <p className="slide__text">{props.text}</p>
      <Button title="Подробнее" type="big-btn" />
    </div>
  );
}
