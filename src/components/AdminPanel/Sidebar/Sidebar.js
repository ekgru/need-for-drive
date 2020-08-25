import React from 'react';
import './Sidebar.scss';
import SidebarLink from './SidebarLink';
export default function Sidebar() {
  const menu = [
    { name: 'Карточка автомобиля', url: '', icon: 'edit' },
    { name: 'Список авто', url: '', icon: 'carList' },
    { name: 'Заказы', url: '', icon: 'orders' },
    { name: 'Меню 1', url: '', icon: 'overview' },
    { name: 'Меню 2', url: '', icon: 'forms' },
    { name: 'Меню 3', url: '', icon: 'person' },
    { name: 'Меню 4', url: '', icon: 'error' },
  ];
  return (
    <>
      <a className='sidebar__head'>
        <span className='logo'></span>
        <p>Need for drive</p>
      </a>
      {menu.map((el, i) => (
        <SidebarLink title={el.name} icon={el.icon} key={i} />
      ))}
    </>
  );
}
