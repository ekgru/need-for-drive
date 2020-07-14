import React from "react";
import geoIcon  from './resources/Geo.svg'
export default class Header extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <header className="header">
        <span className="header__site-name">Need for drive</span>
        <span className="header__geolocation"><img className='header__geolocation__icon'src={geoIcon}/>{" "} Краснодар</span>
      </header>
    );
  }
}
