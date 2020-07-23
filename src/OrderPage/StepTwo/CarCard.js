import React from "react";
import "./CarCard.scss";
export default function CarCard(props) {
  let { name, costMin, costMax, pic, category } = props;
  return (
    <label className="car-card">
      <input
        className="car-card__radio-btn"
        type="radio"
        name="car"
        value={name}
      />
      <div className="car-card__info-card">
        <h2 className="car-card__info-card__head">{name}</h2>
        <p className="car-card__info-card__cost">
          {costMin} - {costMax}
        </p>
        <img className="car-card__info-card__img" src={pic} alt="car" />
      </div>
    </label>
  );
}
