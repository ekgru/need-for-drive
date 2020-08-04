import React from 'react';
import './CarCard.scss';
export default function CarCard({
  title,
  costMin,
  costMax,
  pic,
  car,
  getCar,
  carInfo,
  display,
}) {
  return (
    <label className='car-card' style={{'display': display}}>
      <input
        className='car-card__radio-btn'
        type='radio'
        name='car'
        value={title}
        onChange={() => {
          getCar(carInfo);
        }}
        checked={title === car ? 'checked' : ''}
      />
      <div className='car-card__info-card'>
        <h2 className='car-card__info-card__head'>{title}</h2>
        <p className='car-card__info-card__cost'>
          {costMin} - {costMax}₽
        </p>
        <img
          className='car-card__info-card__img'
          src={`http://api-factory.simbirsoft1.com${pic}`}
          alt='car'
        />
      </div>
    </label>
  );
}
