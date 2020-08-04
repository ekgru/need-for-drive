import React, { useState } from 'react';
import Button from '../../Button';
import Warning from './Warning';
import './Total.scss';
import { Link } from 'react-router-dom';

export default function Total({ params, action }) {
  const [warning, setWarning] = useState(false);
  const {
    currentStep,
    cityId,
    pointId,
    carInfo,
    currentColor,
    dateFrom,
    dateTo,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    tariff,
  } = params;
  const { name } = carInfo;
  function isDisable(step) {
    const i = +step;
    switch (i) {
      case 0:
        return cityId.id && pointId.id ? false : true;
      case 1:
        return cityId.id && pointId.id && name ? false : true;
      case 2:
        return cityId.id && pointId.id && name && dateFrom && dateTo
          ? false
          : true;
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
        result % 60,
      )} Минут`;
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
          {cityId.id && pointId.id && (
            <p className='total__list__item'>
              <span className='text'>Пункт выдачи</span>
              <span className='dots'></span>
              <span className='text__dinamic'>
                {cityId.name}
                <br /> {pointId.name}
              </span>
            </p>
          )}
          {name && (
            <p className='total__list__item'>
              <span className='text'>Модель</span>{' '}
              <span className='dots'></span>
              <span className='text__dinamic'>{name}</span>
            </p>
          )}
          {name && currentColor && (
            <p className='total__list__item'>
              <span className='text'>Цвет</span> <span className='dots'></span>
              <span className='text__dinamic'>{currentColor}</span>
            </p>
          )}
          {dateFrom !== 0 && dateTo !== 0 && (
            <p className='total__list__item'>
              <span className='text'>Длительность аренды</span>
              <span className='dots'></span>
              <span className='text__dinamic'>{getTime()}</span>
            </p>
          )}
          {name && tariff && (
            <p className='total__list__item'>
              <span className='text'>Тариф</span> <span className='dots'></span>
              <span className='text__dinamic'>
                {tariff === 'perMin' ? 'Поминутно' : 'Посуточно'}
              </span>
            </p>
          )}
          {name && isFullTank && (
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
            <Link className='button  big-btn red-btn fake-btn' to='/'>
              Отменить
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
