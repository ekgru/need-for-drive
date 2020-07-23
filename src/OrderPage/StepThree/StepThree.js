import React from "react";
import "./StepThree.scss";
import TextInput from "../../TextInput";
export default class StepThree extends React.Component {
  render() {
    return (
      <div className="step-three">
        <form className="step-three__form"></form>
        <fieldset className="step-three__form__color-selector">
          <legend>Цвет</legend>
          <br></br>
          <label className="step-three__form__color-selector__description">
            <input
              className="step-three__form__color-selector__radio-btn"
              type="radio"
              name="Цвет"
              value="anything"
              defaultChecked
            />
            <span> Любой</span>
          </label>
          <label className="step-three__form__color-selector__description">
            <input
              className="step-three__form__color-selector__radio-btn"
              type="radio"
              name="Цвет"
              value="Red"
            />
            <span>Красный</span>
          </label>
          <label className="step-three__form__color-selector__description">
            <input
              className="step-three__form__color-selector__radio-btn"
              type="radio"
              name="Цвет"
              value="Blue"
            />
            <span>Голубой</span>
          </label>
        </fieldset>
        <fieldset>
          <legend>Дата аренды</legend>
          <TextInput name={"С"} type="datetime-local" />
          <br />
          <TextInput name={"До"} type="datetime-local" />
        </fieldset>
        <fieldset className="step-three__form__tariff">
          <legend>Тариф</legend>
          <br></br>
          <label className="step-three__form__tariff__description">
            <input
              className="step-three__form__tariff__radio-btn"
              type="radio"
              name="Тариф"
              value="perMin"
              defaultChecked
            />
            <span>Поминутно, 7₽/мин</span>
          </label>
          <br />
          <label className="step-three__form__tariff__description">
            <input
              className="step-three__form__tariff__radio-btn"
              type="radio"
              name="Тариф"
              value="perDay"
            />
            <span>На сутки, 1999 ₽/сутки</span>
          </label>
        </fieldset>
        <fieldset className="step-three__form__additional">
          <legend>Дополнительные услуги</legend>
          <br></br>
          <label className="step-three__form__additional__description">
            <input
              className="step-three__form__additional__checkbox"
              type="checkbox"
              name="Тариф"
              value="perMin"
              defaultChecked
            />
            <span>Полный бак, 500р</span>
          </label>
          <br />
          <label className="step-three__form__additional__description">
            <input
              className="step-three__form__additional__checkbox"
              type="checkbox"
              name="Тариф"
              value="perDay"
            />
            <span>Детское кресло, 200р</span>
          </label>
          <br />
          <label className="step-three__form__additional__description">
            <input
              className="step-three__form__additional__checkbox"
              type="checkbox"
              name="Тариф"
              value="perMin"
            />
            <span>Правый руль, 1600р</span>
          </label>
        </fieldset>
      </div>
    );
  }
}
