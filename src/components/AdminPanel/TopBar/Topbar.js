import React from 'react';
import person from './../../../resources/Person.svg';
import './Topbar.scss';
import { useHistory } from 'react-router-dom';
export default function Topbar({
  userName,
  api,
  isAuth,
  setLoad,
  getCookie,
}) {
  const history = useHistory();
  function logout() {
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Authorization': 'Bearer ' + getCookie('access_token'),
    };
    setLoad(true);
    fetch(`${api}auth/logout`, {
      method: 'POST',
      headers: headers,
    })
      .then(() => {
        document.cookie = `basicToken='';
         max-age=0;
         path='/need-for-drive/admin`;
        document.cookie = `access_token='';
         max-age=0;
         path='/need-for-drive/admin`;
        document.cookie = `refresh_token='';
         max-age=0;
         path='/need-for-drive/admin`;
      })
      .then(() => {
        setLoad(true);
        history.push('/admin/authorization');
        setLoad(false);
      })
      .catch((err) => {
        setLoad(true);
        history.push('/admin/authorization');
        setLoad(false);
      });
  }
  return (
    <>
      <form className='searching-form'>
        <span className='icon shape'></span>
        <input
          className='searching-form__input'
          type='text'
          name='search'
          placeholder='Поиск..'
        />
      </form>
      <div className='notifications-block'>
        <span className='notifications-block__icon'></span>
        <span className='notifications-block__counter'>1</span>
      </div>
      <div className='user-block'>
        <div className='user-block__group'>
          <span className='user-block__group__user-info'>
            <img
              className='user-block__group__user-info__user-pic'
              src={person}
            />
            <p className='user-block__group__user-info__user-name'>
              {userName || 'Администратор'}
            </p>
          </span>
          <span className='user-block__wrapper'>
            <span></span>
          </span>
        </div>
        <div className='user-block__logout'>
          <button onClick={logout}>Выйти</button>
        </div>
      </div>
    </>
  );
}
