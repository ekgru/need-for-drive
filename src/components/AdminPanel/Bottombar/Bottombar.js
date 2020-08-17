import React from 'react';
import './Bottombar.scss';
import { Link } from 'react-router-dom';
export default function Bottombar() {
  return (
    <>
      <div className='admin-panel__container__bottombar__link-block'>
        <Link className='link' to='/'>
          Главная страница
        </Link>
        <Link className='link' to='/order-page/'>
          Страница заказов
        </Link>
      </div>
      <p className='admin-panel__container__bottombar__copyright'>
        Copyright © 2020 Simbirsoft
      </p>
    </>
  );
}
