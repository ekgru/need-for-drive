import React, { useState, useEffect } from 'react';
import './StepThree.scss';
import CustomInput from '../../CustomInput';
export default function StepThree({
  action,
  actionClick,
  currentColor,
  colors,
  options,
  tariff,
  dateFrom,
  dateTo,
  api,
  headers,
  actionInfo,
}) {
  const [tariffs, setTarffs] = useState([]);

  useEffect(() => {
    fetch(`${api}rate`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setTarffs(data);
        if (!tariff) {
          actionInfo('rateId', data[0]);
        }
      })
      .catch((err) => console.error('ERROR', err));
  }, []);

  const additional = [
    { name: 'isFullTank', description: 'Полный бак, 500р' },
    { name: 'isNeedChildChair', description: 'Детское кресло, 200р' },
    { name: 'isRightWheel', description: 'Правый руль, 1600р' },
  ];

  return (
    <div className='step-three'>
      <form className='step-three__form'>
        <fieldset className='step-three__form__color-selector'>
          <legend>Цвет</legend>
          <br></br>
          {[...['Любой'], ...colors].map((el, i) => (
            <CustomInput
              key={i}
              type='radio'
              name='currentColor'
              value={el}
              checked={currentColor === el ? true : false}
              description={el}
              onChangeAction={action}
            />
          ))}
        </fieldset>
        <fieldset className='step-three__form__date-selector'>
          <legend>Дата аренды</legend>
          <CustomInput
            dateTo={dateTo}
            onChangeAction={action}
            name='dateFrom'
            description={'С'}
            type='datetime-local'
            value={dateFrom}
          />
          <br />
          <CustomInput
            dateFrom={dateFrom}
            onChangeAction={action}
            name='dateTo'
            description={'До'}
            value={dateTo}
            type='datetime-local'
          />
        </fieldset>
        <fieldset className='step-three__form__tariff'>
          <legend>Тариф</legend>
          <br />
          {tariffs.map((el, i) => (
            <CustomInput
              key={i}
              type='radio'
              checked={tariff === el.rateTypeId.name ? true : false}
              description={`${el.rateTypeId.name},
               ${el.price}₽/${el.rateTypeId.unit}`}
              onChangeAction={() => actionInfo('rateId', el)}
            />
          ))}
        </fieldset>
        <fieldset className='step-three__form__additional'>
          <legend>Дополнительные услуги</legend>
          <br />
          {additional.map((el, i) => (
            <CustomInput
              key={i}
              type='checkbox'
              name={el.name}
              checked={options[i]}
              description={el.description}
              onChangeAction={actionClick}
            />
          ))}
        </fieldset>
      </form>
    </div>
  );
}
