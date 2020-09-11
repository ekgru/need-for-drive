import React, { useEffect, useState } from 'react';
import AdminRequest from '../AdminRequest';
import AdminTable from '../AdminTable/AdminTable';
import './RatePage.scss';
import AdminLoader from '../AdminLoader';
export default function RatePage({ getCookie }) {
  const [rateData, setData] = useState();
  useEffect(() => {
    new AdminRequest('db/rate/', 'GET').doRequest().then(({ data }) =>
      setData(
        data.map(
          (el) =>
            (el = {
              updatedAt: new Date(el.updatedAt).toLocaleString('RU'),
              price: `${el.price} ₽ в ${el.rateTypeId.unit}`,
              id: el.id,
              name: el.rateTypeId.name,
            }),
        ),
      ),
    );
  }, []);
  const columns = [
    { name: 'Название тарифа', dataName: 'name' },
    { name: 'Стоимость', dataName: 'price' },
    { name: 'Обновлено', dataName: 'updatedAt' },
  ];
  return (
    <>
      <h1 className='admin__heading'>Список тарифов</h1>
      <div className='rate-page'>
        {rateData ? (
          <AdminTable columns={columns} data={rateData} />
        ) : (
          <span className='rate-page__wrapper'><AdminLoader /></span>
        )}
      </div>
    </>
  );
}
