import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authorization from './Authorization';
import './AdminPanel.scss';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import Bottombar from './Bottombar';
import Orders from './Orders';
import ErrorPage from './ErrorPage';
import CarEditCard from './CarEditCard';
import CityPointCard from './CityPointCard';
import AdminLoader from './AdminLoader';

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)',
      ),
    );
    return matches ? matches[1] : undefined;
  }

  const api =
    'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/';
  const headers = {
    'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    'Content-Type': 'application/json',
  };

  function checkAuth() {
    setLoad(true);
    fetch(`${api}auth/check`, {
      method: 'GET',
      headers: {
        ...headers,
        Authorization: 'Bearer ' + getCookie('access_token'),
      },
    })
      .then((response) => response.json())
      .then((res) => {
        setUserName(res.username);
        setAuth(true);
        setLoad(false);
      })
      .catch(() => {
        const data = { refresh_token: getCookie('refresh_token') };

        fetch(`${api}auth/refresh`, {
          method: 'POST',
          headers: {
            ...headers,
            Authorization: 'Basic ' + getCookie('basicToken'),
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((res) => {
            document.cookie = `access_token=${res.access_token};
        max-age=${res.expires_in};
        path='/need-for-drive/admin`;
            document.cookie = `refresh_token=${res.refresh_token};
        max-age=${res.expires_in};
        path=/need-for-drive/admin`;
            setAuth(true);
            setLoad(false);
          })
          .catch((err) => {
            console.error('ERROR', err);

            setAuth(false);

            setLoad(false);
          });
      });
  }

  return (
    <div className='admin-panel'>
      <Switch>
        <Route path='/admin/autorization'>
          {auth && !isLoad ? (
            <Redirect to='/admin/' />
          ) : isLoad ? (
            <AdminLoader />
          ) : (
            <Authorization isAuth={checkAuth} />
          )}
        </Route>
        <Route path='/admin/'>
          <div className='admin-panel__container'>
            <div className='admin-panel__container__topbar'>
              <Topbar
                api={api}
                userName={userName}
                getCookie={getCookie}
                isAuth={checkAuth}
              />
            </div>
            <div className='admin-panel__container__sidebar'>
              <Sidebar />
            </div>
            <div className='admin-panel__container__content'>
              <Switch>
                {!auth && <Redirect to='/admin/autorization' />}
                <Route exact path='/admin/'>
                  <h1 className='admin__hello-text'>
                    Добро пожаловать, {userName || 'администратор'}!
                  </h1>
                </Route>
                <Route
                  exact
                  path='/admin/car-edit-card'
                  component={CarEditCard}
                />
                <Route exact path='/admin/orders'>
                  <Orders
                    api={api}
                    headers={headers}
                    getCookie={getCookie}
                  />
                </Route>
                <Route
                  exact
                  path='/admin/points'
                  component={CityPointCard}
                />

                <Route path='/admin/*' component={ErrorPage} />
              </Switch>
            </div>
            <div className='admin-panel__container__bottombar'>
              <Bottombar />
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}
