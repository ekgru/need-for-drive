import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../Button';

export default function Warning({ actionReturn, data, getInfo, orderId }) {
  const history = useHistory();
  const api = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/';
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

    actionReturn();
  }
  function cancel() {
    localStorage.removeItem('orderId');
    getInfo('orderId', '');
    history.push('/');
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
