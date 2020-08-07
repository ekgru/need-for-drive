import React from 'react';
import './Loader.scss';
export default function Loader() {
  return (
    <div className='loading-window'>
      <div className='car'>
        <div className='strike'></div>
        <div className='strike strike2'></div>
        <div className='strike strike3'></div>
        <div className='strike strike4'></div>
        <div className='strike strike5'></div>
        <div className='car-detail spoiler'></div>
        <div className='car-detail back'></div>
        <div className='car-detail center'></div>
        <div className='car-detail center1'></div>
        <div className='car-detail front'></div>
        <div className='car-detail wheel'></div>
        <div className='car-detail wheel wheel2'></div>
      </div>

      <div className='text'>
        <span>Загружаем карту</span>
        <span className='dot'>...</span>
      </div>
    </div>
  );
}
