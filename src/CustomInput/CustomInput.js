import React from "react";
import "./CustomInput.scss";
export default function CustomInput(props) {
  let {
    name,
    type,
    placeholder,
    onChangeAction,
    onClickAction,
    value,
    checked,
    description,
  } = props;
  console.log(props.type + "type" + (props.type === "datetime-local"));
  return type === "text" || type === "datetime-local" || type === "select" ? (
    <label className="label-for-text-input">
      {name}
      <input
        className="textInput"
        type={type}
        required="required"
        name={name}
        placeholder={placeholder}
        onChange={onChangeAction}
        value={value}
      />
      {type === "text" ? (
        <button
          className="reset-btn"
          onClick={onClickAction}
          title="Очистить поле"
          type="reset"
        >
          &times;
        </button>
      ) : (
        ""
      )}
    </label>
  ) : type === "radio" ? (
    <label className="radio-btn__description">
      <input
        className="radio-btn"
        type="radio"
        name={name}
        value={value}
        defaultChecked={checked}
      />
      <span>{description}</span>
    </label>
  ) : (
    <label className="checkbox__description">
      <input
        className="checkbox"
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={checked}
      />
      <span>{description}</span>
    </label>
  );
}
