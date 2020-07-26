import React from "react";
import Header from "../Header/";
import StepOne from "./StepOne/";
import StepTwo from "./StepTwo/";
import StepThree from "./StepThree/";
import StepFour from "./StepFour/";
import FinalPage from "./FinalPage/";
import Total from "./Total/";
import "./OrderPage.scss";
export default class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      completedSteps: 0,
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
  handleClick(event){
    const {name} = event.target;
    this.setState((prevState)=> {return {[name]:!prevState[name]}})
  }
  stepComplited() {
    this.setState((prevState) => {
      return this.state.currentStep + 1 > this.state.completedSteps
        ? {
            currentStep: +prevState.currentStep + 1,
            completedSteps: +prevState.completedSteps + 1,
          }
        : { currentStep: +prevState.currentStep + 1 };
    });
  }
  render() {
    const steps = [
      <StepOne
        action={this.handleChange}
        city={this.state.city}
        point={this.state.point}
      />,
      <StepTwo action={this.handleChange} />,
      <StepThree action={this.handleChange} actionClick={this.handleClick} color={this.state.color} options={[this.state.isFullTank,
        this.state.isNeedChildChair,
        this.state.isRightWheel]} />,
      <StepFour action={this.handleChange} carInfo={{}} />,
      <FinalPage />,
    ];
    return (
      <div className="order-page">
        <Header />
        {this.state.currentStep === 4 ? (
          <div className="final-page__nav">
            <p>Заказ номер {this.state.orderNumber || "RU58491823"}</p>
          </div>
        ) : (
          <div className="order-page__nav">
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={0}
              disabled={this.state.completedSteps >= 0 ? false : "disabled"}
              onClick={this.handleChange}
            >
              Местоположение
            </button>
            <span>►</span>
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={1}
              disabled={this.state.completedSteps >= 1 ? false : "disabled"}
              onClick={this.handleChange}
            >
              Модель
            </button>
            <span>►</span>
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={2}
              disabled={this.state.completedSteps >= 2 ? false : "disabled"}
              onClick={this.handleChange}
            >
              Дополнительно
            </button>
            <span>►</span>
            <button
              className="order-page__nav__btn"
              name="currentStep"
              value={3}
              disabled={this.state.completedSteps >= 3 ? false : "disabled"}
              onClick={this.handleChange}
            >
              Итого
            </button>
          </div>
        )}
        <div className="order-page__container">
          <section className="order-page__container__form">
            {steps[this.state.currentStep]}
          </section>
          <section className="order-page__container__total">
            <Total action={() => this.stepComplited()} params={this.state} />
          </section>
        </div>
      </div>
    );
  }
}
