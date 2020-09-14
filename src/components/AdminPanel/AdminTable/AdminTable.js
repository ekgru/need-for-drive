import React from 'react';
import './AdminTable.scss';
export default function AdminTable({ columns, data }) {
  return (
    <table className='admin-table'>
      <thead className='admin-table__row head'>
        <tr>
          {columns.map((el) => (
            <th className='admin-table__cell head' key={el.dataName}>
              {el.name}
            </th>
          ))}
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
            </tr>
          ))
        ) : (
          <tr className='admin-table__row'>
            <td className='admin-table__cell' colSpan='3'>
              Данные не найдены
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
