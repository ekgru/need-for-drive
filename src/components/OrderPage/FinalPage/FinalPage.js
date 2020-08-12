import React, { useEffect, useState } from 'react';
import StepFour from '../StepFour';
import './FinalPage.scss';
import { useParams, useHistory } from 'react-router-dom';
import Total from '../Total';
export default function FinalPage({ getInfo }) {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [carInfo, setCarInfo] = useState([]);
  const api = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
  };
  const history = useHistory();

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${api}order/${orderId}`, {
      method: 'GET',
      headers: headers,
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setOrderInfo(data);
        return data;
      })
      .then(({ carId }) =>
        fetch(`${api}car/${carId.id}`, {
          method: 'GET',
          headers: headers,
          signal: controller.signal,
        }),
      )
      .then((res) => res.json())
      .then(({ data }) => setCarInfo(data))
      .catch(() => {
        localStorage.removeItem('orderId');
        getInfo('orderId', '');
        history.push('/order-page/');
      });
    getInfo('orderId', orderId);
    return () => controller.abort();
  }, []);
  return (
    <>
      {orderInfo.carId && carInfo.name && (
        <>
          <div className='order-page__container__form'>
            <h1 className='final-page__head'>Ваш заказ подтвержден:</h1>
            <StepFour carId={carInfo} dateFrom={orderInfo.dateFrom} />
          </div>
          <div className='order-page__container__total'>
            <Total getInfo={getInfo} params={orderInfo} />
          </div>
        </>
      )}
    </>
  );
}
