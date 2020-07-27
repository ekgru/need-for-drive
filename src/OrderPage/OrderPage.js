import React from "react";
import Header from "../Header/";
import StepOne from "./StepOne/";
import StepTwo from "./StepTwo/";
import StepThree from "./StepThree/";
import StepFour from "./StepFour/";
import Total from "./Total/";
import "./OrderPage.scss";
export default class OrderPage extends React.Component {
  render() {
    return (
      <div className="order-page">
        <Header />
        <div className="order-page__nav">
         <input
            type="button"
            className="order-page__nav__btn"
            value="Местоположение"
          />
          <span>►</span>
          <input
            type="button"
            className="order-page__nav__btn"
            value="Модель"
            disabled
          />
          <span>►</span>
          <input
            type="button"
            className="order-page__nav__btn"
            value="Дополнительно"
            disabled
          />
          <span>►</span>
          <input
            type="button"
            className="order-page__nav__btn"
            value="Итого"
            disabled
          />
        </div>
        <div className="order-page__container">
          <section className="order-page__container__form">
            <StepOne carInfo={{}}/>
          </section>
          <section className="order-page__container__total">
            <Total />
          </section>
        </div>
      </div>
    );
  }
}
