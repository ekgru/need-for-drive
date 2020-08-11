import React from 'react';
import Button from '../../Button';

export default function Warning({
  actionCancel,
  data,
  api,
  getInfo,
  actionOk,
}) {
  function ok() {
    fetch(`${api}order`, {
      method: 'POST',
      headers: {
        'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(({ data }) => getInfo(`orderId`, data.id))
      .catch((err) => console.error('ERROR', err));

    actionCancel();
    actionOk();
  }
  return (
    <div className='warning'>
      <div className='warning__btns-block'>
        <h1 className='warning__btns-block__head'> Подтвердить заказ?</h1>
        <span>
          <Button title='Подтвердить' type='warn-btn' action={() => ok()}>
            Подтвердить
          </Button>
          <Button
            title='Отменить'
            type='warn-btn red-btn'
            action={actionCancel}
          />
        </span>
      </div>
    </div>
  );
}
