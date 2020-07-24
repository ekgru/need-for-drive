import React from "react";
import "./StepThree.scss";
import CustomInput from "../../CustomInput";
export default class StepThree extends React.Component {
  render() {
    return (
      <div className="step-three">
        <form className="step-three__form">
          <fieldset className="step-three__form__color-selector">
            <legend>Цвет</legend>
            <br></br>
            <CustomInput
              type="radio"
              name="Цвет"
              value="anything"
              checked={true}
              description="Любой"
            />
            <CustomInput
              type="radio"
              name="Цвет"
              value="Red"
              checked={false}
              description="Красный"
            />
            <CustomInput
              type="radio"
              name="Цвет"
              value="Blue"
              checked={false}
              description="Голубой"
            />
          </fieldset>
          <fieldset className="step-three__form__date-selector">
            <legend>Дата аренды</legend>
            <CustomInput name={"С"} type="datetime-local" />
            <br />
            <CustomInput name={"До"} type="datetime-local" />
          </fieldset>
          <fieldset className="step-three__form__tariff">
            <legend>Тариф</legend>
            <br />
            <CustomInput
              type="radio"
              name="Тариф"
              value="perMin"
              checked={true}
              description="Поминутно, 7₽/мин"
            />
            <br />
            <CustomInput
              type="radio"
              name="Тариф"
              value="perDay"
              checked={false}
              description="На сутки, 1999 ₽/сутки"
            />
          </fieldset>
          <fieldset className="step-three__form__additional">
            <legend>Дополнительные услуги</legend>
            <br />
            <CustomInput
              type="checkbox"
              name="Опции"
              value="full fuel"
              checked={true}
              description="Полный бак, 500р"
            />
            <br />
            <CustomInput
              type="checkbox"
              name="Опции"
              value="child seat"
              checked={false}
              description="Детское кресло, 200р"
            />
            <br />
            <CustomInput
              type="checkbox"
              name="Опции"
              value="right hand drive"
              checked={false}
              description="Правый руль, 1600р"
            />
          </fieldset>
        </form>
      </div>
    );
  }
}
