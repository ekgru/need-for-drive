import React from 'react';
import person from './../../../resources/Person.svg';
import './Topbar.scss';
export default function Topbar({ api, isAuth, getCookie }) {
  function logout() {
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Authorization': 'Bearer ' + getCookie('accessToken'),
    };
    fetch(`${api}auth/logout`, {
      method: 'POST',
      headers: headers,
    })
      .then(() => {
        document.cookie = `basicToken='';  path='/need-for-drive`;
        isAuth();
      })
      .catch((err) => {
        isAuth();
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
          <img className='user-block__user-pic' src={person} />
          <p className='user-block__user-name'> Администратор</p>
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
