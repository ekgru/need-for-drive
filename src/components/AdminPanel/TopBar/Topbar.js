import React from 'react';
import person from './../../../resources/Person.svg';
import './Topbar.scss';
export default function Topbar() {
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
        <img className='user-block__user-pic' src={person} />
        <p className='user-block__user-name'> Администратор</p>
      </div>
    </>
  );
}
