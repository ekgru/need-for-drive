import React, { useState } from 'react';
import NavBtn from './NavBtn';
import './NavBar.scss';
export default function NavBar() {
  const [view, setView] = useState(false);
  const [eng, setEng] = useState(false);
  const menuItems = ['Парковка', 'Страховка', 'Бензин', 'Обслуживание'];
  const social = ['telegram', 'facebook', 'instagram'];
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
          {menuItems.map((el, i) => (
            <a key={i} className='nav-menu__link-list__link' href='#'>
              {el}
            </a>
          ))}
          <span className='nav-menu__link-list__social-block'>
            {social.map((el, i) => (
              <span key={i} className={`icon icon-${el}`}></span>
            ))}
          </span>
        </nav>
      </div>
    </>
  );
}
