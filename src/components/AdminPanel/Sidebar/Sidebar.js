import React from 'react';
import './Sidebar.scss';
import SidebarLink from './SidebarLink';
export default function Sidebar() {
  const menu = [
    { name: 'Карточка автомобиля', url: '/admin/car-edit-card', icon: 'edit' },
    { name: 'Список авто', url: '/admin/car-list', icon: 'carList' },
    { name: 'Заказы', url: '/admin/orders', icon: 'orders' },
    { name: 'Добавление точек выдачи', url: '/admin/points', icon: 'overview' },
    { name: 'Тарифы', url: '/admin/rate-list', icon: 'forms' },
    { name: 'Точки выдачи', url: '/admin/points-list', icon: 'person' },
    { name: 'Меню 4', url: '/admin/menu4', icon: 'error' },
  ];
  return (
    <>
      <a className='sidebar__head'>
        <span className='logo'></span>
        <p>Need for drive</p>
      </a>
      {menu.map((el, i) => (
        <SidebarLink url={el.url} title={el.name} icon={el.icon} key={i} />
      ))}
    </>
  );
}
