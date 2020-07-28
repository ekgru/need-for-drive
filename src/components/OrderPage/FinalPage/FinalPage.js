import React from "react";
import StepFour from "../StepFour";
import "./FinalPage.scss";
export default function FinalPage() {
  return (
    <section className="final-page">
      <h1 className='final-page__head'>Ваш заказ подтвержден:</h1>
      <StepFour carInfo={{}} />
    </section>
  );
}
