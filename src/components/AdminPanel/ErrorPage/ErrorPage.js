import React from 'react';
import './ErrorPage.scss';
import { useHistory } from 'react-router-dom';
export default function ErrorPage({ errorCode }) {
  const history = useHistory();
  function goToMain() {
    history.push('/admin');
  }
  return (
    <div className='error-page'>
      <h1 className='error-page__code'>{errorCode || '404'}</h1>
      <h2 className='error-page__description'>Что-то пошло не так</h2>
      <h3 className='error-page__small-text'>
        {errorCode
          ? 'Попробуйте перезагрузить страницу'
          : 'Страница не найдена'}
      </h3>
      <button onClick={goToMain} className='admin__button blue'>
        Вернуться
      </button>
    </div>
  );
}
