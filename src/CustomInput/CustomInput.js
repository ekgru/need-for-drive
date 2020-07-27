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
    list,
  } = props;
  return type === "text" || type === "datetime-local" || type === "select" ? (
    <label className="label-for-text-input">
      {description}
      <input
        className="textInput"
        type={type}
        required="required"
        name={name}
        placeholder={placeholder}
        onChange={onChangeAction}
        value={value}
        list={list}
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
        onChange={onChangeAction}
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
        onChange={onChangeAction}
        defaultChecked={checked}
      />
      <span>{description}</span>
    </label>
  );
}
