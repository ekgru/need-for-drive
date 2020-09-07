import React, { useEffect, useState } from 'react';
import './CarListPage.scss';
import AdminRequest from '../AdminRequest';
import CarListCard from './CarListCard';
import AdminPagination from '../AdminPagination';
export default function CarListPage({ getCookie }) {
  const [page, setPage] = useState(1);
  const [thisList, setThisList] = useState();
  const [countPages, setCountPages] = useState();

  useEffect(() => {
    const width = document.documentElement.clientWidth;
    getCarList(width);
  }, [page]);

  function getCarList(width) {
    const getCars = new AdminRequest(
      `db/car?page=${page - 1}&limit=${width < 1024 ? 1 : 2}`,
      'GET',
      `Bearer ${getCookie('access_token')}`,
    );
    getCars.doRequest().then((res) => {
      setThisList(res.data);
      setCountPages(Math.ceil(res.count / 2));
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
  return (
    <>
      <h1 className='admin__heading'>Список автомобилей</h1>
      <div className='car-list-page'>
        <div className='car-list-page__container'>
          {thisList &&
            thisList.map((el) => (
              <CarListCard
                key={el.id}
                img={el.thumbnail.path}
                carName={el.name}
                description={el.description}
                number={el.number}
                colors={el.colors}
                updated={el.updatedAt}
                tank={el.tank}
              />
            ))}
        </div>
        <div className='order-block__pagination'>
          {thisList && (
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
