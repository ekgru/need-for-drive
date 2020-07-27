import React from "react";
import "./StepFour.scss";
import fakeCar from "../../resources/car.png";
export default function StepFour({ carInfo, fuel, available }) {
  let { brand, number, img } = carInfo;
  return (
    <div className="step-four">
      <div className="step-four__info-block">
        <h1 className="step-four__info-block__brand">
          {brand || "Информация недоступна"}
        </h1>
        <p className="step-four__info-block__number">
          {number || "А 000 AA 00"}
        </p>
        <p className="step-four__info-block__fuel">
          <span>Топливо </span>
          {fuel || "N"}%
        </p>
        <p className="step-four__info-block__avilable">
          <span>Доступна с </span>
          {available || "00.00.0000 00:00"}
        </p>
      </div>
      <div className="step-four__car">
        <img src={img || fakeCar} alt="car" />
      </div>
    </div>
  );
}
