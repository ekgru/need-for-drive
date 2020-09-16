import React, { useState } from 'react';
import './RateCreatePage.scss';
import AdminTextInput from '../AdminTextInput';
export default function RateCreatePage() {
  const [price, setPrice] = useState(1);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  const inputs = [
    {
      id: 1,
      legend: 'Стоимость *',
      onChange: handler,
      name: 'price',
      value: price,
      placeholder: 'Введите стоимость в рублях',
      type: 'number',
    },
    {
      id: 2,
      legend: 'Название тарифа *',
      onChange: handler,
      name: 'name',
      value: name,
      placeholder: 'Введите название тарифа',
    },
    {
      id: 3,
      legend: 'Единица измерения тарифа *',
      onChange: handler,
      name: 'unit',
      value: unit,
      placeholder: 'Введите единицу измерения тарифа',
    },
  ];

  function handler(event) {
    const { name, value } = event.target;
    if (name === 'price') {
      setPrice(value);
    } else if (name === 'name') {
      setName(value);
    } else {
      setUnit(value);
    }
  }
  return (
    <>
      <h1 className='admin__heading'>Создание тарифов</h1>
      <div className='create-rate-block'>
        <div>{inputs.map((el) => (
          <AdminTextInput
            isNumber={el.type}
            key={el.id}
            name={el.name}
            value={el.value}
            placeholder={el.placeholder}
            legend={el.legend}
            onChange={el.onChange}
          />
        ))}</div>
        <div className='create-rate-block__btn-bar'>
          <button className='admin__button blue'>Сохранить</button>
          <button className='admin__button gray'>Отменить</button>
        </div>
      </div>
    </>
  );
}
