import React from "react";
import carImg from "../../resources/car.png";
import CarCard from "./CarCard";
import "./StepTwo.scss";
export default class StepTwo extends React.Component {
  getCars() {
    //метод для сбора карточек с машинами, пока фейковый
    const cars = [
      { name: "Elantra", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 1", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 2", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 3", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 4", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 5", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 6", costMin: "12000", costMax: "25000", img: carImg },
      { name: "Elantra 7", costMin: "12000", costMax: "25000", img: carImg },
    ];
    let result = cars.map((el, i) => (
      <CarCard
        name={el.name}
        costMin={el.costMin}
        costMax={el.costMax}
        pic={el.img}
        key={i}
      />
    ));
    return result;
  }
  render() {
    return (
      <div className="car-selector">
        <form className="car-selector__category-form">
          <label className="car-selector__category-form__description">
            <input
              className="car-selector__category-form__radio-btn"
              type="radio"
              name="model"
              value="all"
            />
            <span>Все модели</span>
          </label>
          <label className="car-selector__category-form__description">
            <input
              className="car-selector__category-form__radio-btn"
              type="radio"
              name="model"
              value="econom"
            />
            <span>Эконом</span>
          </label>
          <label className="car-selector__category-form__description">
            <input
              className="car-selector__category-form__radio-btn"
              type="radio"
              name="model"
              value="premium"
            />
            <span>Премиум</span>
          </label>
        </form>
        <div className="car-selector__container">
          <div className="car-selector__container__car-list">{this.getCars()}</div>
        </div>
      </div>
    );
  }
}
