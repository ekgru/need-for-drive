import React from 'react';
export default function SidebarLink({title, url, active, icon}) {
  return (
    <a className='sidebar__link' >
      <span className={`sidebar__link__icon ${icon}`}/>{title}
    </a>
  );
}
