import React from 'react';
import './StepThree.scss';
import CustomInput from '../../CustomInput';
export default function StepThree({
  action,
  actionClick,
  color,
  options,
  tariff,
  dateFrom,
  dateTo,
}) {
  const colors = ['Любой', 'Красный', 'Голубой'];
  const tariffs = [
    { value: 'perMin', description: 'Поминутно, 7₽/мин' },
    { value: 'perDay', description: 'На сутки, 1999 ₽/сутки' },
  ];
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
          {colors.map((el, i) => (
            <CustomInput
              key={i}
              type='radio'
              name='color'
              value={el}
              checked={color === el ? true : false}
              description={el}
              onChangeAction={action}
            />
          ))}
        </fieldset>
        <fieldset className='step-three__form__date-selector'>
          <legend>Дата аренды</legend>
          <CustomInput
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
              name='tariff'
              value={el.value}
              checked={tariff === el.value ? true : false}
              description={el.description}
              onChangeAction={action}
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
