import React, { useState, useEffect } from 'react';
import './RateCreatePage.scss';
import AdminTextInput from '../AdminTextInput';
import AdminRequest from '../AdminRequest';
export default function RateCreatePage() {
  const [price, setPrice] = useState(1);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [rateTypes, setRateTypes] = useState([]);

  useEffect(() => {
    new AdminRequest('db/rateType', 'GET')
      .doRequest()
      .then(({ data }) => setRateTypes(data))
      .catch((err) => console.error(err));
  }, []);
  const inputs = [
    {
      id: 1,
      legend: 'Стоимость *',
      onChange: onChangeHandler,
      name: 'price',
      value: price,
      placeholder: 'Введите стоимость в рублях',
      type: 'number',
    },
    {
      id: 2,
      legend: 'Название тарифа *',
      onChange: onChangeHandler,
      name: 'name',
      value: name,
      placeholder: 'Введите название тарифа',
    },
    {
      id: 3,
      legend: 'Единица измерения тарифа *',
      onChange: onChangeHandler,
      name: 'unit',
      value: unit,
      placeholder: 'Введите единицу измерения тарифа',
    },
  ];

  function onChangeHandler(event) {
    const { name, value } = event.target;
    if (name === 'price') {
      setPrice(value);
    } else if (name === 'name') {
      setName(value);
    } else {
      setUnit(value);
    }
  }
  function createRate() {
    const rateTypeId=rateTypes.find((el) => el.unit === unit || el.name === name)
    if (rateTypeId) {
      const body = {
        price: price,
        rateTypeId: {
          id: rateTypeId.id,
        },
      };
      new AdminRequest('db/rate', 'POST', null, body).doRequest();
    } else {
      new AdminRequest('db/rateType', 'POST', null, {
        unit: unit,
        name: name,
      })
        // сделать проверку на наличие типа тарифа
        .doRequest()
        .then(({ data }) =>
          new AdminRequest('db/rate', 'POST', null, {
            price: price,
            rateTypeId: {
              id: data.id,
            },
          }).doRequest()
        );
    }
  }
  return (
    <>
      <h1 className='admin__heading'>Создание тарифов</h1>
      <div className='create-rate-block'>
        <div>
          {inputs.map((el) => (
            <AdminTextInput
              isNumber={el.type}
              key={el.id}
              name={el.name}
              value={el.value}
              placeholder={el.placeholder}
              legend={el.legend}
              onChange={el.onChange}
            />
          ))}
        </div>
        <div className='create-rate-block__btn-bar'>
          <button
            disabled={(!price || !unit || !name) && 'disabled'}
            onClick={createRate}
            className='admin__button blue'
          >
            Сохранить
          </button>
          <button className='admin__button gray'>Отменить</button>
        </div>
      </div>
    </>
  );
}
