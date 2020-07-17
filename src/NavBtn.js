import React from "react";
import "./NavBtn.scss";
export default function NavBtn(props) {
  return (
    <a className="nav-btn" onClick={props.action}>
      <span className={"nav-btn__toggle" + (!props.active ? "" : " active")}>
        <span className="nav-btn__bar__wrapper">
          <span className="nav-btn__bar"></span>
        </span>
      </span>
    </a>
  );
}
