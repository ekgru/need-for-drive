import React from "react";
import Button from "./Button";


export default function MainPageInfoBlock() {
  return (
    <div className="main-page__content__info-block">
      <h1 className="main-page__content__info-block__heading">
        Каршеринг
        <br />
        <span className="main-page__content__info-block__heading__eng">
          Need for drive
        </span>
      </h1>
      <p className="main-page__content__info-block__text">
        Поминутная аренда авто твоего города
      </p>
      <Button title="Забронировать" type="big-btn" action={()=>document.location='/need-for-drive/order-page'} />
    </div>
  );
}
