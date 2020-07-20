import React from "react";
import Button from "../../Button";
import "./Total.scss";
export default function Total() {
  return (
    <div className="total">
      <h1 className="total__head">Ваш заказ:</h1>
      <div className="total__list">
        <p className="total__list__item">
          <span className="text">Пункт выдачи</span>
          <span className="text__dinamic">Город, улица</span>
        </p>
        <p className="total__list__item">
          <span className="text">Модель</span>
          <span className="text__dinamic">Модель, номер</span>
        </p>
        <p className="total__list__item">
          <span className="text">Цвет</span>
          <span className="text__dinamic">Цвет</span>
        </p>
        <p className="total__list__item">
          <span className="text">Длительность аренды</span>
          <span className="text__dinamic">Nд Nч</span>
        </p>
        <p className="total__list__item">
          <span className="text">Тариф</span>
          <span className="text__dinamic">На N</span>
        </p>
        <p className="total__list__item">
          <span className="text">Полный бак</span>
          <span className="text__dinamic">Да/нет</span>
        </p>
      </div>
      <Button />
    </div>
  );
}
