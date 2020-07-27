import React from "react";
import Header from "../Header/";
import Total from "../OrderPage/Total";
import StepFour from "../OrderPage/StepFour/";
import "./FinalPage.scss";
export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      orderNumber: "",
    };
  }
  render() {
    return (
      <div className="order-page">
        <Header />
        <div className="final-page__nav">
          <p>Заказ номер {this.state.orderNumber || "RU58491823"}</p>
        </div>
        <div className="final-page__container">
          <section className="final-page__container__info">
            <StepFour carInfo={{}} />
          </section>
          <section className="final-page__container__total">
            <Total />
          </section>
        </div>
      </div>
    );
  }
}
