import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Button';

export default function Warning({ actionOk, actionCancel }) {
  return (
    <div className="warning">
      <div className="warning__btns-block">
        <h1 className="warning__btns-block__head"> Подтвердить заказ?</h1>
        <span>
          <Link
            className="button warn-btn fake-btn"
            to={'/need-for-drive/order-page/final'}
            onClick={actionOk}
          >
            Подтвердить
          </Link>
          <Button
            title="Отменить"
            type="warn-btn red-btn"
            action={actionCancel}
          />
        </span>
      </div>
    </div>
  );
}
