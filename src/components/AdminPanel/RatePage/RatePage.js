import React, { useEffect, useState } from 'react';
import AdminRequest from '../AdminRequest';
import AdminTable from '../AdminTable/AdminTable';
import './RatePage.scss';
import AdminLoader from '../AdminLoader';
import { useHistory } from 'react-router-dom';
export default function RatePage() {
  const history = useHistory();
  const [rateData, setData] = useState();
  useEffect(() => {
    new AdminRequest('db/rate/', 'GET')
      .doRequest()
      .then(({ data }) =>
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
      )
      .catch(() => history.push('/admin/error-page/'));
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
          <AdminLoader />
        )}
      </div>
    </>
  );
}
