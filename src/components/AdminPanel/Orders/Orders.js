import React, { Fragment, useState, useEffect } from 'react';
import './Orders.scss';
import CustomInput from '../../CustomInput';
import fakeCar from '../../../resources/car.png';
import { useHistory } from 'react-router-dom';
import AdminLoader from '../AdminLoader';
import AdminPagination from '../AdminPagination';
export default function Orders({ api, headers, getCookie }) {
  const options = [
    { name: 'isFullTank', description: 'Полный бак' },
    { name: 'isNeedChildChair', description: 'Детское кресло' },
    { name: 'isRightWheel', description: 'Правый руль' },
  ];
  const history = useHistory();
  const [viewFilter, setViewFilter] = useState(false);
  const [isLoad, setLoad] = useState(true);
  const [page, setPage] = useState(1);
  const [currentOrder, setCurrentOrder] = useState({});
  const [countPages, setCountPages] = useState(1);
  const [filterList, setFilterList] = useState({
    cities: [],
    cars: [],
    statuses: [],
  });

  const [filter, setFilter] = useState({
    date: 0,
    carId: '',
    cityId: '',
    status: '',
  });

  useEffect(() => {
    getOrderTable();
  }, [page]);

  function getOrderTable() {
    setLoad(true);
    const { carId, date, cityId, status } = filter;
    fetch(
      `${api}db/order?page=${page - 1}&limit=1&createdAt[$gt]=${date}${
        carId && '&carId=' + carId
      }${cityId && '&cityId=' + cityId}${
        status && '&orderStatusId=' + status
      }`,
      {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: 'Bearer ' + getCookie('access_token'),
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setCurrentOrder(res.data[0]);
        setCountPages(res.count);
        setLoad(false);
      })
      .catch((err) => {
        history.push('/admin/error-page');
        console.log(err);
      });
  }

  function paginationHandler(event) {
    const { name, value } = event.target;
    switch (name) {
      case 'back':
        setPage(+page - 1);
        break;
      case 'forward':
        setPage(+page + 1);
        break;
      default:
        setPage(value);
        break;
    }
  }


  function filterHandler(event) {
    const now = new Date();
    const { name, value } = event.target;
    if (name === 'date') {
      switch (value) {
        case 'all':
          setFilter({ ...filter, [name]: 0 });
          break;
        case 'month':
          setFilter({
            ...filter,
            [name]: now.setMonth(now.getMonth() - 1),
          });
          break;
        case 'week':
          setFilter({ ...filter, [name]: now.setDate(now.getDate() - 7) });
          break;
        case 'day':
          setFilter({ ...filter, [name]: now.setDate(now.getDate() - 1) });
          break;
        case 'hours':
          setFilter({
            ...filter,
            [name]: now.setHours(now.getHours() - 3),
          });
          break;
      }
    } else if (
      name === 'carId' ||
      name === 'cityId' ||
      name === 'status'
    ) {
      setFilter({ ...filter, [name]: value });
    }
  }

  function createFilters() {
    if (!viewFilter) {
      let cars;
      let cities;
      let statuses;
      fetch(`${api}db/city/`, {
        method: 'GET',
        headers: headers,
      })
        .then((response) => response.json())
        .then(({ data }) => {
          cities = data;
        })
        .then(() => {
          fetch(`${api}db/car/`, {
            method: 'GET',
            headers: headers,
          })
            .then((response) => response.json())
            .then(({ data }) => {
              cars = data;
            })
            .then(() => {
              fetch(`${api}db/orderStatus/`, {
                method: 'GET',
                headers: headers,
              })
                .then((response) => response.json())
                .then(({ data }) => {
                  statuses = data;
                })
                .then(() =>
                  setFilterList({
                    cars: cars,
                    cities: cities,
                    statuses: statuses,
                  }),
                )
                .catch((err) => console.error('ERROR', err));
            })
            .catch((err) => console.error('ERROR', err));
        })
        .catch((err) => console.error('ERROR', err));
      setViewFilter(!viewFilter);
    } else {
      setViewFilter(!viewFilter);
    }
  }

  return (
    <>
      <h1 className='admin__heading'>Заказы</h1>
      <div className='order-block'>
        <div className='order-block__sort-container'>
          <span onClick={createFilters} className='filter-icon'></span>

          {viewFilter && (
            <form className='order-block__sort-container__sort'>
              <select
                onChange={filterHandler}
                name='date'
                className='admin__select'
              >
                <option value='all'>За все время</option>
                <option value='month'>За месяц</option>
                <option value='week'>За неделю</option>
                <option value='day'>За сутки</option>
                <option value='hours'>За три часа</option>
              </select>
              <select
                onChange={filterHandler}
                className='admin__select'
                name='carId'
              >
                <option value=''>Любая марка</option>
                {filterList &&
                  filterList.cars.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
              </select>
              <select
                onChange={filterHandler}
                className='admin__select'
                name='cityId'
              >
                <option value=''>Все города</option>
                {filterList &&
                  filterList.cities.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
              </select>
              <select
                onChange={filterHandler}
                className='admin__select'
                name='status'
              >
                <option value=''>Все статусы</option>
                {filterList &&
                  filterList.statuses.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.name}
                    </option>
                  ))}
              </select>
              <button
                onClick={getOrderTable}
                className='admin__button blue'
                type='button'
              >
                Применить
              </button>
            </form>
          )}
        </div>

        <div className='order-block__info'>
          {isLoad ? (
            <AdminLoader />
          ) : currentOrder ? (
            <>
              <span className='order-block__info__part'>
                <img
                  crossOrigin='anonymous'
                  referrerPolicy='origin'
                  className='order-block__info__img'
                  src={
                    `http://api-factory.simbirsoft1.com${currentOrder.carId.thumbnail.path}` ||
                    fakeCar
                  }
                  alt='car'
                />
                <p className='order-block__info__text'>
                  <span>{currentOrder.carId.name || 'МАРКА'}</span> в{' '}
                  <span>
                    {currentOrder.cityId.name || 'Город'}{' '}
                    {currentOrder.pointId.address || 'Улица'}
                  </span>{' '}
                  <br />
                  {new Date(currentOrder.dateFrom).toLocaleString('RU') ||
                    '01.01.2001 01:01'}{' '}
                  -{' '}
                  {new Date(currentOrder.dateTo).toLocaleString('RU') ||
                    '01.01.2001 01:01'}
                  <br />
                  Цвет: <span>{currentOrder.color || 'Белый'}</span>
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
                        checked={currentOrder[el.name]}
                        readOnly={true}
                      />
                      <br />
                    </Fragment>
                  ))}
                </span>
                <p className='order-block__info__cost'>
                  {currentOrder.price || '00000'} ₽
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
            </>
          ) : (
            'Заказы не найдены'
          )}
        </div>

        <div className='order-block__pagination'>
          {currentOrder && (
            <AdminPagination
              paginationHandler={paginationHandler}
              page={page}
              countPages={countPages}
            />
          )}
        </div>
      </div>
    </>
  );
}
