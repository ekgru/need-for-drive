import React, { useEffect, useState } from 'react';
import './CarListPage.scss';
import AdminRequest from '../AdminRequest';
import CarListCard from './CarListCard';
import AdminPagination from '../AdminPagination';
import AdminLoader from '../AdminLoader';
export default function CarListPage() {
  const [page, setPage] = useState(1);
  const [thisList, setThisList] = useState();
  const [countPages, setCountPages] = useState();
  const controller = new AbortController();
  useEffect(() => {
    const width = document.documentElement.clientWidth;
    getCarList(width);
    return () => controller.abort();
  }, [page]);

  function getCarList(width) {
    setThisList('');
    const getCars = new AdminRequest(
      `db/car?page=${page - 1}&limit=${width < 1024 ? 1 : 2}`,
      'GET',
    null,
      null,
      controller.signal,
    );
    getCars
      .doRequest()
      .then((res) => {
        setThisList(res.data);
        setCountPages(Math.ceil(res.count / 2));
      })
      .catch((err) => {
        console.error('ERROR', err);
      });
  }

  return (
    <>
      <h1 className='admin__heading'>Список автомобилей</h1>
      <div className='car-list-page'>
        <div className='car-list-page__container'>
          {thisList ? (
            thisList.map((el) => (
              <CarListCard
                key={el.id}
                id={el.id}
                img={el.thumbnail.path}
                carName={el.name}
                description={el.description}
                number={el.number}
                colors={el.colors}
                updated={el.updatedAt}
                tank={el.tank}
              />
            ))
          ) : (
            <AdminLoader />
          )}
        </div>

        <AdminPagination
          setPage={setPage}
          page={page}
          countPages={countPages || 1}
        />
      </div>
    </>
  );
}
