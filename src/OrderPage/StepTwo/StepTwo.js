import React from "react";
import carImg from "../../resources/car.png";
import CarCard from "./CarCard";
import "./StepTwo.scss";
export default class StepTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      category: "all",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  getCars() {
    //метод для сбора карточек с машинами, пока фейковый
    const cars = [
      {
        name: "Elantra",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "premium",
      },
      {
        name: "Elantra 1",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "econom",
      },
      {
        name: "Elantra 2",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "premium",
      },
      {
        name: "Elantra 3",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "econom",
      },
      {
        name: "Elantra 4",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "premium",
      },
      {
        name: "Elantra 5",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "econom",
      },
      {
        name: "Elantra 6",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "premium",
      },
      {
        name: "Elantra 7",
        costMin: "12000",
        costMax: "25000",
        img: carImg,
        category: "econom",
      },
    ];
    let result = cars.map((el, i) =>
      this.state.category === "all" ? (
        <CarCard
          name={el.name}
          costMin={el.costMin}
          costMax={el.costMax}
          pic={el.img}
          key={i}
        />
      ) : el.category === this.state.category ? (
        <CarCard
          name={el.name}
          costMin={el.costMin}
          costMax={el.costMax}
          pic={el.img}
          key={i}
        />
      ) : (
        ""
      )
    );
    return result;
  }
  handleChange(event) {
    this.setState({ category: event.target.value });
  }
  render() {
    return (
      <div className="car-selector">
        <form
          className="car-selector__category-form"
          onChange={this.handleChange}
        >
          <label className="car-selector__category-form__description">
            <input
              className="car-selector__category-form__radio-btn"
              type="radio"
              name="model"
              value="all"
              defaultChecked
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
          <div className="car-selector__container__car-list">
            {this.getCars()}
          </div>
        </div>
      </div>
    );
  }
}
