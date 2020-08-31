import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Authorization from './Authorization';
import './AdminPanel.scss';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import Bottombar from './Bottombar';
import Orders from './Orders';
import ErrorPage from './ErrorPage';
import CarEditCard from './CarEditCard';
import CityPointCard from './CityPointCard';
export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const history = useHistory();

  useEffect(() => {
    isAuth();
  }, [history.location]);
  function isAuth() {
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
    const api = 'http://api-factory.simbirsoft1.com/api/';
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + getCookie('basicToken'),
    };
    const data = { refresh_token: getCookie('refreshToken') };
    fetch(`${api}auth/refresh`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        document.cookie = `accessToken=${res.access_token}; max-age=${res.expires_in}; path='/need-fro-drive`;
        document.cookie = `refreshToken=${res.refresh_token}; max-age=${res.expires_in}; path=/need-fro-drive`;
        setAuth(true);
      })
      .catch((err) => {
        console.error('ERROR', err);
        setAuth(false);
      });
  }

  return (
    <div className='admin-panel'>
      <Switch>
        <Route path='/admin/autorization'>
          <Authorization />
          {auth && <Redirect to='/admin/' />}
        </Route>
        <Route path='/admin/'>
          <div className='admin-panel__container'>
            <div className='admin-panel__container__topbar'>
              <Topbar />
            </div>
            <div className='admin-panel__container__sidebar'>
              <Sidebar />
            </div>
            <div className='admin-panel__container__content'>
              <Switch>
                {!auth && <Redirect to='/admin/autorization' />}
                <Route exact path='/admin/'>
                  <h1 className='admin__hello-text'>
                    Добро пожаловать, {/* username || */ 'администратор'}!
                  </h1>
                </Route>
                <Route
                  exact
                  path='/admin/car-edit-card'
                  component={CarEditCard}
                />
                <Route exact path='/admin/orders' component={Orders} />
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
