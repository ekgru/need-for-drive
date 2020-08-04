import React from 'react';
import './CarCard.scss';
export default function CarCard({
  title,
  costMin,
  costMax,
  pic,
  category,
  action,
  car
}) {
  return (
    <label className="car-card">
      <input
        className="car-card__radio-btn"
        type="radio"
        name="car"
        value={title}
        onChange={action}
        checked={title===car ? 'checked' : ''}
      />
      <div className="car-card__info-card">
        <h2 className="car-card__info-card__head">{title}</h2>
        <p className="car-card__info-card__cost">
          {costMin} - {costMax}
        </p>
        <img className="car-card__info-card__img" src={pic} alt="car" />
      </div>
    </label>
  );
}
