import React, { useState } from "react";
import btn from "./resources/menu_btn.svg";
import closeBtn from "./resources/close_menu_btn.svg";
export default function NavBar() {
  const [view, setView] = useState(false);
  return (
    <><div className="nav-bar">
      <img
        className="nav-btn"
        src={btn}
        alt="|||"
        onClick={() => setView(!view)}
      />
      
    </div>
    <div
    className="nav-menu"
    style={view ? { display: "flex" } : { display: "none" }}
  >
    <img
      className="nav-btn"
      src={closeBtn}
      alt="x"
      onClick={() => setView(!view)}
    />
    <nav className="nav-menu__link-list">
      <a className="nav-menu__link-list__link" href="#">
        Парковка
      </a>
      <a className="nav-menu__link-list__link" href="#">
        Страховка
      </a>
      <a className="nav-menu__link-list__link" href="#">
        Бензин
      </a>
      <a className="nav-menu__link-list__link" href="#">
        Обслуживание
      </a>
    </nav>
  </div></>
  );
}
