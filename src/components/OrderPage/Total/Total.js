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
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    rateId,
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
  const mins = (new Date(dateTo) - new Date(dateFrom)) / 60000;
  function getTime() {
    if (rateId.rateTypeId.name === 'Поминутно') {
      return `${Math.trunc(mins / 60)} часов ${Math.trunc(mins % 60)} Минут`;
    } else {
      const result = mins / 60;
      return `${Math.round(result / 24)} дней`;
    }
  }
  function getPrice() {
    const optionsCost =
      (isFullTank && 500) + (isNeedChildChair && 200) + (isRightWheel && 1600);
    if (rateId.rateTypeId.name === 'Поминутно') {
      return `${Math.round(mins * rateId.price + optionsCost)} ₽`;
    } else {
      return `${Math.round((mins / 1440) * rateId.price + optionsCost)} ₽`;
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
          {name && rateId.rateTypeId && (
            <p className='total__list__item'>
              <span className='text'>Тариф</span> <span className='dots'></span>
              <span className='text__dinamic'>{rateId.rateTypeId.name}</span>
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
            <span>Итого:</span>{' '}
            { !carInfo.priceMin
              ? `от 8 000 до 12 000 ₽`
              : mins > 0 && rateId.price
              ? getPrice()
              : `${carInfo.priceMin} ₽ - ${carInfo.priceMax} ₽`}
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
