import React from "react";
import Button from "../../Button";
import "./Total.scss";
export default function Total(props) {
  let { params, action } = props;
  let {
    currentStep,
  completedSteps,
    city,
    point,
    car,
    color,
    dateFrom,
    dateTo,
    rateId,
    price,
    isFullTank,
    isNeedChildChair,
    isRightWheel,
    tariff,
  } = params;
  function isDisable() {
    switch (currentStep) {
      case 0:
        return city && point ? false : true;
      case 1:
        return car  ? false : true;
      case 2:
        return dateFrom && dateTo ? false : true;
      case 3:
        return false;
    }
  }
  const titles = [
    "Выбрать модель",
    "Дополнительно",
    "Итого",
    "Заказать",
    "Отменить",
  ];
  function getTime(){
    let resultHours = (new Date(dateTo) - new Date(dateFrom)) /3600000
    return (resultHours >= 24 ? `${Math.trunc(resultHours / 24)} Д ${Math.trunc(resultHours % 24)} Ч`: resultHours + 'Ч')
  }
  return (
    <div className="total">
      <h1 className="total__head">Ваш заказ:</h1>
      <div className="total__list">
        {city && point && (
          <p className="total__list__item">
            <span className="text">Пункт выдачи</span>
            <span className="dots"></span>
            <span className="text__dinamic">
              {city}
              <br /> {point}
            </span>
          </p>
        )}
        {car && (
          <p className="total__list__item">
            <span className="text">Модель</span> <span className="dots"></span>
            <span className="text__dinamic">{car}</span>
          </p>
        )}
        {(currentStep === 2 || completedSteps === 2) && color && (
          <p className="total__list__item">
            <span className="text">Цвет</span> <span className="dots"></span>
            <span className="text__dinamic">{color}</span>
          </p>
        )}
        {dateFrom != 0 && dateTo != 0 && (
          <p className="total__list__item">
            <span className="text">Длительность аренды</span>
            <span className="dots"></span>
            <span className="text__dinamic">{getTime()}</span>
          </p>
        )}
        {(currentStep === 2 || completedSteps === 2)&&tariff && (
          <p className="total__list__item">
            <span className="text">Тариф</span> <span className="dots"></span>
        <span className="text__dinamic">{ tariff ==='perMin'?'Поминутно':'На сутки'}</span>
          </p>
        )}
        {isFullTank && (
          <p className="total__list__item">
            <span className="text">Полный бак</span>
            <span className="dots"></span>
            <span className="text__dinamic">Да</span>
          </p>
        )}
        {isNeedChildChair && (
          <p className="total__list__item">
            <span className="text">Детское кресло</span>
            <span className="dots"></span>
            <span className="text__dinamic">Да</span>
          </p>
        )}
        {isRightWheel && (
          <p className="total__list__item">
            <span className="text">Правый руль</span>
            <span className="dots"></span>
            <span className="text__dinamic">Да</span>
          </p>
        )}
        <p className="total__sum">
          <span>Итого:</span> {price}
        </p>
        <Button
          type="big-btn"
          title={titles[currentStep]}
          action={action}
          disable={isDisable()}
        />
      </div>
    </div>
  );
}
