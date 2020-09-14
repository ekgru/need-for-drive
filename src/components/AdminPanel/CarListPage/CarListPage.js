import React, { useEffect, useState } from 'react';
import './CarListPage.scss';
import AdminRequest from '../AdminRequest';
import CarListCard from './CarListCard';
import AdminPagination from '../AdminPagination';
import AdminLoader from '../AdminLoader';
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

  return (
    <>
      <h1 className='admin__heading'>Список автомобилей</h1>
      <div className='car-list-page'>
        {thisList ? (
          <div className='car-list-page__container'>
            {thisList.map((el) => (
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
        ) : (
          <AdminLoader />
        )}
        {thisList && (
          <AdminPagination
            setPage={setPage}
            page={page}
            countPages={countPages}
          />
        )}
      </div>
    </>
  );
}
