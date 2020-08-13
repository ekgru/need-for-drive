import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Button';

export default function Warning({ actionReturn, data, getInfo, orderId }) {
  const history = useHistory();
  const api =
    'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
  };
  function ok() {
    fetch(`${api}order`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(({ data }) => {
        localStorage.setItem('orderId', data.id);
        getInfo(`orderId`, data.id);
        history.push(`/order-page/order/${data.id}`);
      })
      .catch((err) => console.error('ERROR', err));

    actionReturn();
  }
  function cancel() {
    localStorage.removeItem('orderId');
    getInfo('orderId', '');
    fetch(`${api}order/${orderId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        orderStatusId: {
          name: 'cancelled',
          id: '5e26a1f5099b810b946c5d8c',
        },
      }),
    });
    getInfo('orderStatus', 'cancelled');
    history.push(`/order-page/order/${orderId}`);
    actionReturn();
  }
  return (
    <div className='warning'>
      <div className='warning__btns-block'>
        <h1 className='warning__btns-block__head'>
          {orderId ? 'Отменить заказ?' : 'Подтвердить заказ?'}
        </h1>
        <span>
          <Button
            title={orderId ? 'Отменить' : 'Подтвердить'}
            type='warn-btn'
            action={() => (orderId ? cancel() : ok())}
          ></Button>
          <Button
            title={orderId ? 'Вернуться' : 'Отменить'}
            type='warn-btn red-btn'
            action={actionReturn}
          />
        </span>
      </div>
    </div>
  );
}
