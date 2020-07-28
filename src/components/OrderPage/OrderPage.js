import React from "react";
import Header from "../Header/";
import StepOne from "./StepOne/";
import StepTwo from "./StepTwo/";
import StepThree from "./StepThree/";
import StepFour from "./StepFour/";
import FinalPage from "./FinalPage/";
import Total from "./Total/";
import { Switch, Route } from "react-router-dom";

import "./OrderPage.scss";
export default class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      cityId: "",
      city: "",
      pointId: "",
      point: "",
      carId: "",
      car: "",
      tariff: "perMin",
      color: "Любой",
      dateFrom: 0,
      dateTo: 0,
      rateId: "",
      price: 0,
      isFullTank: true,
      isNeedChildChair: false,
      isRightWheel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleClick(event) {
    const { name } = event.target;
    this.setState((prevState) => {
      return { [name]: !prevState[name] };
    });
  }
  stepNavigation() {
    this.setState((prevState) => {
      return { currentStep: +prevState.currentStep + 1 };
    });
  }
  render() {
    const {
      city,
      point,
      isNeedChildChair,
      isRightWheel,
      isFullTank,
      orderNumber,
      currentStep,
      color,
      dateTo,
      dateFrom,
      car,
    } = this.state;
    const steps = [
      <StepOne action={this.handleChange} city={city} point={point} />,
      <StepTwo action={this.handleChange} />,
      <StepThree
        action={this.handleChange}
        actionClick={this.handleClick}
        color={color}
        options={[isFullTank, isNeedChildChair, isRightWheel]}
      />,
      <StepFour carInfo={{}} />,
      // <FinalPage />,
    ];
    return (
      <div className="order-page">
        <Header />
        {currentStep === 4 ? (
          <div className="final-page__nav">
            <p>Заказ номер {orderNumber || "RU58491823"}</p>
          </div>
        ) : (
          <div className="order-page__nav">
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={0}
              onClick={this.handleChange}
            >
              Местоположение
            </button>
            <span>►</span>
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={1}
              disabled={city && point ? false : "disabled"}
              onClick={this.handleChange}
            >
              Модель
            </button>
            <span>►</span>
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={2}
              disabled={car ? false : "disabled"}
              onClick={this.handleChange}
            >
              Дополнительно
            </button>
            <span>►</span>
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={3}
              disabled={dateTo && dateFrom ? false : "disabled"}
              onClick={this.handleChange}
            >
              Итого
            </button>
          </div>
        )}
        <div className="order-page__container">
          <section className="order-page__container__form">
            <Switch>
              <Route
                exact
                path="/need-for-drive/order-page/"
                render={() => steps[currentStep]}
              />
              <Route
                exact
                path="/need-for-drive/order-page/final"
                component={() => <StepFour carInfo={{}} />}
              />
            </Switch>
          </section>
          <section className="order-page__container__total">
            <Total action={() => this.stepNavigation()} params={this.state} />
          </section>
        </div>
      </div>
    );
  }
}
