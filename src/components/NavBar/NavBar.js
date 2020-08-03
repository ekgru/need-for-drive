import React, { useState } from 'react';
import NavBtn from './NavBtn';
import './NavBar.scss';
export default function NavBar() {
  const [view, setView] = useState(false);
  const [eng, setEng] = useState(false);
  return (
    <>
      <div className='nav-bar'>
        <NavBtn active={view} action={() => setView(!view)} />
        <button
          className={'nav-btn__lang' + (view ? ' active' : '')}
          onClick={() => setEng(!eng)}
        >
          {eng ? 'Рус' : 'Eng'}
        </button>
      </div>
      <div className={'nav-menu' + (view ? '  active' : '')}>
        <nav className='nav-menu__link-list'>
          <a className='nav-menu__link-list__link' href='#'>
            Парковка
          </a>
          <a className='nav-menu__link-list__link' href='#'>
            Страховка
          </a>
          <a className='nav-menu__link-list__link' href='#'>
            Бензин
          </a>
          <a className='nav-menu__link-list__link' href='#'>
            Обслуживание
          </a>
          <span className='nav-menu__link-list__social-block'>
            <span className='icon icon-telegram'></span>
            <span className='icon icon-facebook'></span>
            <span className='icon icon-instagram'></span>
          </span>
        </nav>
      </div>
    </>
  );
}
