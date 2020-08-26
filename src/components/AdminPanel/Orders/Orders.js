import React, { Fragment, useState } from 'react';
import './Orders.scss';
import CustomInput from '../../CustomInput';
import fakeCar from '../../../resources/car.png';
export default function Orders() {
  const options = [
    { name: 'isFullTank', description: 'Полный бак' },
    { name: 'isNeedChildChair', description: 'Детское кресло' },
    { name: 'isRightWheel', description: 'Правый руль' },
  ];
  const [viewFilter, setViewFilter] = useState(false);

  return (
    <>
      <h1 className='admin__heading'>Заказы</h1>
      <div className='order-block'>
        <div className='order-block__sort-container'>
          <span
            onClick={() => setViewFilter(!viewFilter)}
            className='filter-icon'
          ></span>

          {viewFilter && (
            <form className='order-block__sort-container__sort'>
              <select className='admin__select' name='period'>
                <option>За неделю</option>
                <option>За месяц</option>
                <option>За сутки</option>
                <option>За три часа</option>
              </select>
              <select className='admin__select' name='carName'>
                <option>Elantra</option>
                <option>Elantra 2</option>
                <option>Elantra 3</option>
                <option>Elantra 4</option>
              </select>
              <select className='admin__select' name='city'>
                <option>Ульяновск</option>
                <option>Саранск</option>
                <option>Саратов</option>
              </select>
              <select className='admin__select' name='status'>
                <option>В процессе</option>
                <option>Отменен</option>
                <option>Выполнен</option>
              </select>
              <button className='admin__button blue' type='submit'>
                Применить
              </button>
            </form>
          )}
        </div>
        <div className='order-block__info'>
          <span className='order-block__info__part'>
            <img
              crossOrigin='anonymous'
              referrerPolicy='origin'
              className='order-block__info__img'
              src={fakeCar}
              // src={`http://api-factory.simbirsoft1.com${thumbnail.path}`}
              alt='car'
            />
            <p className='order-block__info__text'>
              <span>{'' /* carname*/ || 'МАРКА'}</span> в{' '}
              <span>{'' /* city*/ || 'Город, улица'}</span> <br />
              {'' /* dateFrom*/ || '01.01.2001 01:01'} -{' '}
              {'' /* dateTo*/ || '01.01.2001 01:01'}
              <br />
              Цвет: <span>{'' /* color */ || 'Белый'}</span>
            </p>
          </span>
          <span className='order-block__info__part'>
            <span className='order-block__info__chechboxes'>
              {options.map((el, i) => (
                <Fragment key={i}>
                  <CustomInput
                    type='checkbox'
                    description={el.description}
                    name={el.name}
                    checked={true}
                    readOnly={true}
                  />
                  <br />
                </Fragment>
              ))}
            </span>
            <p className='order-block__info__cost'>
              {'' /* cost */ || '00000'} ₽
            </p>
            <span className='order-block__info__buttons'>
              <button className='order-block__info__buttons__ok'>
                <span>✔</span> Готово
              </button>
              <button className='order-block__info__buttons__cancel'>
                <span>✖</span> Отмена
              </button>
              <button className='order-block__info__buttons__edit'>
                <span>⁝</span> Изменить
              </button>
            </span>
          </span>
        </div>
        <div className='order-block__pagination'>
          <a className='admin__link'>1</a> <a className='admin__link'>2</a>{' '}
          <a className='admin__link'>3</a>{' '}
          <a className='admin__link'>...</a>{' '}
          <a className='admin__link'>10</a>{' '}
          <a className='admin__link'>11</a>{' '}
          <a className='admin__link'>12</a>
        </div>
      </div>
    </>
  );
}
