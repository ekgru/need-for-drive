import React from 'react';
import fakeCar from '../../../resources/car.png';
export default function TableRow({
  img,
  carName,
  description,
  number,
  colors,
  updated,
  tank,
}) {
  return (
    <div className='car-list-page__car-card'>
      <div className='car-list-page__car-card__img'>
        <img
          crossOrigin='anonymous'
          referrerPolicy='origin'
          src={img ? `http://api-factory.simbirsoft1.com${img}` : fakeCar}
          alt='car'
        />
      </div>
      <div className='car-list-page__car-card__name'>
        <p>{carName || 'Марка не указана'}</p>
      </div>
      <div className='car-list-page__car-card__number'>
        <p>{number != undefined && number ? number : 'Номер не указан'}</p>
      </div>
      <div className='car-list-page__car-card__colors'>
        <p>{colors ? colors.join(', ') : 'Цвета не указаны'}</p>
      </div>
      <div className='car-list-page__car-card__tank'>
        <p>{(tank || '0') + '%'}</p>
      </div>
      <div className='car-list-page__car-card__updated'>
        <p>
          {updated
            ? 'Обновлено: ' + new Date(updated).toLocaleDateString()
            : 'Дата последнего обновления неизвестна'}
        </p>
      </div>

      <div className='car-list-page__car-card__description'>
        <p>
          {description != 'undefined' && description
            ? description
            : 'Описание не указано'}
        </p>
      </div>
    </div>
  );
}
