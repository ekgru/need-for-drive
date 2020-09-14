import React from 'react';
import './AdminLoader.scss';
export default function AdminLoader() {
  return (
    <span className='loader-wrapper'>
      <div className='cssload-loader'>
        <div className='cssload-inner cssload-one'></div>
        <div className='cssload-inner cssload-two'></div>
        <div className='cssload-inner cssload-three'></div>
      </div>
    </span>
  );
}
