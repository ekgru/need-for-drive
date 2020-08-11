import React from 'react';
import './StepFour.scss';
export default function StepFour({ carInfo, dateFrom }) {
  const { name, number, tank, thumbnail } = carInfo;
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  return (
    <div className='step-four'>
      <div className='step-four__info-block'>
        <h1 className='step-four__info-block__brand'>{name}</h1>
        <p className='step-four__info-block__number'>
          {number ? number.replace(/(\d{3})/, ' $1 ') : 'A 000 AA'}
        </p>
        <p className='step-four__info-block__fuel'>
          <span>Топливо </span>
          {tank}%
        </p>
        <p className='step-four__info-block__avilable'>
          <span>Доступна с </span>
          {new Date(dateFrom).toLocaleString('ru', options)}
        </p>
      </div>
      <div className='step-four__car'>
        <img
          crossOrigin='anonymous'
          referrerPolicy='origin'
          className='car-card__info-card__img'
          src={`http://api-factory.simbirsoft1.com${thumbnail.path}`}
          alt='car'
        />
      </div>
    </div>
  );
}
