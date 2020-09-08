import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useParams,
} from 'react-router-dom';
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
  const history = useHistory();
  useEffect(() => {
    checkAuth();
  }, []);

  function getCookie(name) {
    const matches = document.cookie.match(
      new RegExp(
        '(?:^|; )' +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
          '=([^;]*)'
      )
    );
    return matches ? matches[1] : undefined;
  }

  const api = 'http://api-factory.simbirsoft1.com/api/';

  function checkAuth() {
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
    };
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
      .catch((err) => {
        setAuth(false);
        history.push('/admin/authorization');
        setLoad(false);
      });
  }

  return (
    <div className='admin-panel'>
      <Switch>
        <Route path='/admin/authorization'>
          {isLoad ? (
            <AdminLoader />
          ) : (
            <Authorization isAuth={checkAuth} auth={auth} />
          )}
        </Route>
        <Route path='/admin/'>
          {isLoad ? (
            <AdminLoader />
          ) : (
            <div className='admin-panel__container'>
              <div className='admin-panel__container__topbar'>
                <Topbar
                  api={api}
                  userName={userName}
                  getCookie={getCookie}
                  setLoad={setLoad}
                  isAuth={checkAuth}
                />
              </div>
              <div className='admin-panel__container__sidebar'>
                <Sidebar />
              </div>
              <div className='admin-panel__container__content'>
                <Switch>
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
          )}
        </Route>
      </Switch>
    </div>
  );
}
