import React, { useState } from 'react';
import Button from '../../Button';
import Warning from './Warning';
import './Total.scss';
import { Link } from 'react-router-dom';

export default function Total({ params, action }) {
  const [warning, setWarning] = useState(false);
  const {
    currentStep,
    city,
    point,
    car,
    color,
    dateFrom,
    dateTo,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    tariff,
  } = params;
  function isDisable(step) {
    const i = +step;
    switch (i) {
      case 0:
        return city && point ? false : true;
      case 1:
        return car ? false : true;
      case 2:
        return dateFrom && dateTo ? false : true;
      case 3:
        return false;
      default:
        return false;
    }
  }
  const titles = [
    'Выбрать модель',
    'Дополнительно',
    'Итого',
    'Заказать',
    'Отменить',
  ];
  function getTime() {
    if (tariff === 'perMin') {
      const result = (new Date(dateTo) - new Date(dateFrom)) / 60000;
      return `${Math.trunc(result / 60)} часов ${Math.trunc(
        result % 60)} Минут`;
    } else {
      const result = (new Date(dateTo) - new Date(dateFrom)) / 3600000;
      return `${Math.round(result / 24)} дней`;
    }
  }
  return (
    <>
      {warning && +currentStep === 3 && (
        <Warning actionCancel={() => setWarning(!warning)} actionOk={action} />
      )}
      <div className='total'>
        <h1 className='total__head'>Ваш заказ:</h1>
        <div className='total__list'>
          {city && point && (
            <p className='total__list__item'>
              <span className='text'>Пункт выдачи</span>
              <span className='dots'></span>
              <span className='text__dinamic'>
                {city}
                <br /> {point}
              </span>
            </p>
          )}
          {car && (
            <p className='total__list__item'>
              <span className='text'>Модель</span>{' '}
              <span className='dots'></span>
              <span className='text__dinamic'>{car}</span>
            </p>
          )}
          {car && color && (
            <p className='total__list__item'>
              <span className='text'>Цвет</span> <span className='dots'></span>
              <span className='text__dinamic'>{color}</span>
            </p>
          )}
          {dateFrom !== 0 && dateTo !== 0 && (
            <p className='total__list__item'>
              <span className='text'>Длительность аренды</span>
              <span className='dots'></span>
              <span className='text__dinamic'>{getTime()}</span>
            </p>
          )}
          {car && tariff && (
            <p className='total__list__item'>
              <span className='text'>Тариф</span> <span className='dots'></span>
              <span className='text__dinamic'>
                {tariff === 'perMin' ? 'Поминутно' : 'На сутки'}
              </span>
            </p>
          )}
          {car && isFullTank && (
            <p className='total__list__item'>
              <span className='text'>Полный бак</span>
              <span className='dots'></span>
              <span className='text__dinamic'>Да</span>
            </p>
          )}
          {isNeedChildChair && (
            <p className='total__list__item'>
              <span className='text'>Детское кресло</span>
              <span className='dots'></span>
              <span className='text__dinamic'>Да</span>
            </p>
          )}
          {isRightWheel && (
            <p className='total__list__item'>
              <span className='text'>Правый руль</span>
              <span className='dots'></span>
              <span className='text__dinamic'>Да</span>
            </p>
          )}
          <p className='total__sum'>
            <span>Итого:</span> {price}
          </p>
          {+currentStep !== 4 ? (
            <Button
              type={`big-btn`}
              title={titles[currentStep]}
              action={+currentStep === 3 ? () => setWarning(!warning) : action}
              disable={isDisable(currentStep)}
            />
          ) : (
            <Link
              className='button  big-btn red-btn fake-btn'
              to='/need-for-drive'
            >
              Отменить
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
