import React from 'react';
import './AdminTable.scss';
import AdminRequest from '../AdminRequest';
import { useHistory } from 'react-router-dom';
export default function AdminTable({
  columns,
  data,
  tableName,
  update,
  setDelete,
}) {
  const history = useHistory();
  function deleteRow(id) {
    new AdminRequest(`${tableName}${id}`, 'DELETE')
      .doRequest()
      .then(() => {
        if (update) {
          update();
        }
      })
      .then(() => setDelete(true))
      .catch((err) => {
        console.error('ERROR', err);
        history.push('/admin/error-page/');
      });
  }

  return (
    <table className='admin-table'>
      <thead className='admin-table__row head'>
        <tr>
          {columns.map((el) => (
            <th className='admin-table__cell head' key={el.dataName}>
              {el.name}
            </th>
          ))}
          <th className='admin-table__cell head'>Удалить</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((val) => (
            <tr key={val.id} className='admin-table__row'>
              {columns.map((el) => (
                <td key={val[el.dataName]} className='admin-table__cell'>
                  {val[el.dataName]}
                </td>
              ))}
              <td
                onClick={() => deleteRow(val.id)}
                className='admin-table__cell delete'
              >
                ✖
              </td>
            </tr>
          ))
        ) : (
          <tr className='admin-table__row'>
            <td className='admin-table__cell' colSpan={columns.length + 1}>
              Данные не найдены
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
