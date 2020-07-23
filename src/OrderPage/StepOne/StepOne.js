import React from "react";
import "./StepOne.scss";
import FakeMap from "../../resources/FakeMap.jpg";
import TextInput from "../../TextInput";
export default class StepOne extends React.Component {
  render() {
    return (
      <div className="step-one">
        <form className="step-one__form" action="">
          <TextInput
            name={"Город"}
            type="text"
            placeholder="Введите название города"
          />
          <br />

          <TextInput
            name={"Пункт Выдачи"}
            type="text"
            placeholder="Выберите пункт выдачи"
          />
        </form>

        <div className="map-block">
          <p className="map-block__description">Выбрать на карте:</p>
          <span>
            <img className="map" src={FakeMap} alt="" />
          </span>
        </div>
      </div>
    );
  }
}
