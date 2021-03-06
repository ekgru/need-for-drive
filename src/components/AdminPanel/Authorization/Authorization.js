import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Authorization.scss';
import AdminLoader from '../AdminLoader';
export default function Authorization() {
  const history = useHistory();
  const [userPass, setPass] = useState('');
  const [userLogin, setLogin] = useState('');
  const [error, setError] = useState(false);
  const [isLoad, setLoad] = useState(false);
  function handler(event) {
    const { name, value } = event.target;
    name === 'login' ? setLogin(value) : setPass(value);
    setError(false);
  }

  function createRandomString(sumString) {
    const symbolArr =
      '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let randomString = '';
    for (let i = 0; i < sumString; i++) {
      const index = Math.floor(Math.random() * symbolArr.length);
      randomString += symbolArr[index];
    }
    return randomString;
  }
  const basicToken = btoa(createRandomString(6) + ':4cbcea96de');
  const api =
    'http://api-factory.simbirsoft1.com/api/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + basicToken,
  };

  function auth(event) {
    event.preventDefault();
    setLoad(true);
    const data = { username: userLogin, password: userPass };
    fetch(`${api}auth/login`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        document.cookie = `basicToken=${basicToken};
         max-age=${res.expires_in}; path='/need-for-drive/admin`;
        document.cookie = `access_token=${res.access_token};
         max-age=${res.expires_in}; path='/need-for-drive/admin`;
        document.cookie = `refresh_token=${res.refresh_token};
         max-age=${res.expires_in}; path='/need-for-drive/admin`;
        setLoad(false);
      })
      .then(() => history.push('/admin/'))
      .catch((err) => {
        console.error('ERROR', err);
        setError(true);
        setLoad(false);
      });
  }
  return (
    <>
      {isLoad ? (
        <AdminLoader />
      ) : (
        <div className='authorization'>
          <span className='authorization__heading'>
            <span className='logo'></span>
            <h2 className='authorization__heading__head'>
              Need for drive
            </h2>
          </span>
          <div className='authorization__login-block'>
            <h3 className='authorization__login-block__name'>Вход</h3>
            <form
              onSubmit={auth}
              className='authorization__login-block__form'
            >
              <fieldset
                className={`authorization__login-block__form__fieldset  ${
                  error && 'error'
                }`}
              >
                <legend>Логин</legend>
                <input
                  className={`admin__input`}
                  name='login'
                  type='text'
                  value={userLogin}
                  onChange={handler}
                />
              </fieldset>
              <fieldset
                className={`authorization__login-block__form__fieldset  ${
                  error && 'error'
                }`}
              >
                <legend>Пароль</legend>
                <input
                  className={`admin__input`}
                  name='password'
                  value={userPass}
                  onChange={handler}
                  type='password'
                />
                {error && <span>Неверный логин или пароль</span>}
              </fieldset>
              <span className='authorization__login-block__form__buttons-block'>
                <a
                  className='admin__link'
                  href='mailto:advice@simbirsoft.com'
                >
                  Запросить доступ
                </a>
                <button
                  onClick={auth}
                  className='admin__button blue'
                  type='submit'
                  disabled={!userPass || !userLogin}
                >
                  Войти
                </button>
              </span>
            </form>
          </div>
        </div>
      )}{' '}
    </>
  );
}
