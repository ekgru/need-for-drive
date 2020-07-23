import React from "react";
import "./TextInput.scss";
export default function TextInput(props) {
  let { name, type, placeholder, onChangeAction, onClickAction, value } = props;
  return (
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
  );
}
