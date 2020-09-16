import React, { useEffect, useState } from 'react';
import './PointsPage.scss';
import AdminLoader from '../AdminLoader';
import AdminTable from '../AdminTable/AdminTable';
import AdminRequest from '../AdminRequest';
import AdminPagination from '../AdminPagination';
import { useHistory } from 'react-router-dom';
export default function PointsPage({ getCookie }) {
  const history = useHistory();
  const [pointsData, setData] = useState();
  const [page, setPage] = useState(1);
  const [countPages, setCountPages] = useState(1);
  const [cityList, setCityList] = useState('');
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('name');
  const [trend, setTrend] = useState('1');
  const controller = new AbortController();
  useEffect(() => {
    setData('');
    getTable();
    return () => controller.abort();
  }, [page, city, sort, trend]);

  function getTable() {
    new AdminRequest(
      `db/point?page=${page - 1}&limit=10${city && '&cityId=' + city}${
        sort && `&sort[${sort}]=${trend}`
      }`,
      'GET',
      `Bearer ${getCookie('access_token')}`,
      null,
      controller.signal,
    )
      .doRequest()
      .then((res) => {
        setCountPages(Math.ceil(res.count / 10));
        setData(
          res.data.map(
            (el) =>
              (el = {
                address: el.address,
                name: el.name,
                id: el.id,
                city: el.cityId.name,
              }),
          ),
        );
      })
      .then(() =>
        new AdminRequest('db/city/', 'GET', null, null, controller.signal)
          .doRequest()
          .then(({ data }) => setCityList(data)),
      )
      .catch((err) => console.error('ERROR', err));
  }
  const columns = [
    { name: 'Адрес', dataName: 'address' },
    { name: 'Название', dataName: 'name' },
    { name: 'Город', dataName: 'city' },
  ];
  function filterHandler(event) {
    const { name, value } = event.target;
    if (name == 'cityId') {
      setCity(value);
    } else {
      switch (value) {
        case 'nameUp':
          setSort('name');
          setTrend('-1');
          break;
        case 'addressUp':
          setSort('address');
          setTrend('-1');
          break;
        case 'nameDown':
          setSort('name');
          setTrend('1');
          break;
        case 'addressDown':
          setSort('address');
          setTrend('1');
          break;
        default:
          history.push('/admin/error-page/');
      }
    }
  }
  return (
    <>
      <h1 className='admin__heading'>Список точек выдачи</h1>
      <div className='points-page'>
        <div className='points-page__sort'>
          <select
            onChange={filterHandler}
            className='admin__select'
            name='cityId'
          >
            <option value=''>Все города</option>
            {cityList &&
              cityList.map((el) => (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              ))}
          </select>
          <select
            onChange={filterHandler}
            className='admin__select'
            name='sort'
          >
            <option value='nameDown'>По названию А-Я ↓</option>
            <option value='nameUp'>По названию Я-А ↑</option>
            <option value='addressUp'>По адресу Я-А ↑</option>
            <option value='addressDown'>По адресу А-Я ↓</option>
          </select>
        </div>
        {pointsData ? (
          <AdminTable columns={columns} data={pointsData} />
        ) : (
          <span className='points-page__wrapper'>
            <AdminLoader />
          </span>
        )}

        <AdminPagination
          page={page}
          setPage={setPage}
          countPages={countPages > 0 ? countPages : 1}
        />
      </div>
    </>
  );
}
