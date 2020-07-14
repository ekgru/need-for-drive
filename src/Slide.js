import React from "react";
import Button from "./Button";
export default function Slide(props) {
  const style = { backgroundImage: `url(${props.img})`};
  return (
    <div className="slide" style={style}>
      <span className='slide__content'><h1 className='slide__content__heading'>{props.head}</h1>
      <p className="slide__content__text">{props.text}</p>
      <Button title="Подробнее"  type={"slide__content__btn "}/></span>
    </div>
  );
}
