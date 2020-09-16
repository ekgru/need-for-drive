import React, { useEffect, useState } from 'react';
import StepFour from '../StepFour';
import './FinalPage.scss';
import { useParams, useHistory } from 'react-router-dom';
import Total from '../Total';
import Loader from '../StepOne/Loader';
export default function FinalPage({ getInfo, orderStatus }) {
  const { orderId } = useParams();
  const [orderInfo, setOrderInfo] = useState([]);
  const [isLoad, setLoad] = useState(false);
  const api = 'http://api-factory.simbirsoft1.com/api/db/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
  };
  const history = useHistory();
  const controller = new AbortController();

  useEffect(() => {
    setLoad(false);
    getOrder();
    return () => controller.abort();
  }, [orderStatus]);

  function getOrder() {
    fetch(`${api}order/${orderId}`, {
      method: 'GET',
      headers: headers,
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(({ data }) => {
        setOrderInfo(data);
        getInfo('orderId', orderId);
        getInfo('orderStatus', data.orderStatusId.name);
        setLoad(true);
        return data;
      })
      .catch(() => {
        localStorage.removeItem('orderId');
        getInfo('orderId', '');
        getInfo('orderStatus', '');
        history.push('/order-page/');
      });
  }
  const getStatus = (status) => {
    switch (status) {
      case 'new':
        return 'Ваш заказ создан:';
      case 'issued':
        return 'Ваш заказ принят и обрабатывается:';
      case 'confirmed':
        return 'Ваш заказ подтвержден:';
      case 'cancelled':
        return 'Ваш заказ отменен:';
      default:
        return 'Ваш заказ:';
    }
  };
  return (
    <>
      <div className='order-page__container__form'>
        {isLoad ? (
          <>
            <h1 className='final-page__head'>
              {getStatus(orderInfo.orderStatusId.name)}
            </h1>
            <StepFour
              carId={orderInfo.carId}
              dateFrom={orderInfo.dateFrom}
            />
          </>
        ) : (
          <div className='loader-container'>
            <Loader />
          </div>
        )}
      </div>
      <div className='order-page__container__total'>
        {isLoad && <Total getInfo={getInfo} params={orderInfo} />}
      </div>
    </>
  );
}
