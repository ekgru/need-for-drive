import React from "react";
import geoIcon from "../resources/Geo.svg";
import "./Header.scss";
export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <a className="header__site-name" href="/need-for-drive">
          Need for drive
        </a>
        <span className="header__geolocation">
          <img
            className="header__geolocation__icon"
            src={geoIcon}
            alt="GeoLocation"
          />
          <p>Краснодар</p>
        </span>
      </header>
    );
  }
}
