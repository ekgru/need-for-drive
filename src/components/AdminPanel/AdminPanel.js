import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
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
import CarListPage from './CarListPage';
import RatePage from './RatePage';
import PointsPage from './PointsPage';

export default function AdminPanel() {
  const [isLoad, setLoad] = useState(true);
  const [userName, setUserName] = useState('');
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [location]);

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
    const access = getCookie('access_token');
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
      'Content-Type': 'application/json',
    };

    if (access) {
      fetch(`${api}auth/check`, {
        method: 'GET',
        headers: {
          ...headers,
          Authorization: 'Bearer ' + access,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          setUserName(res.username);
          setLoad(false);
        })
        .catch((err) => {
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
              setLoad(false);
            })
            .catch(() => {
              if (location.pathname != '/admin/authorization') {
                history.push('/admin/authorization');
              }
              setLoad(false);
            });
        });
    } else {
      if (location.pathname != '/admin/authorization') {
        history.push('/admin/authorization');
        setLoad(false);
      }
    }
    setLoad(false);
  }

  return (
    <div className='admin-panel'>
      {isLoad ? (
        <AdminLoader />
      ) : (
        <Switch>
          <Route path='/admin/authorization'>
            {isLoad ? <AdminLoader /> : <Authorization />}
          </Route>
          <Route path='/admin/'>
            <div className='admin-panel__container'>
              <div className='admin-panel__container__topbar'>
                <Topbar
                  api={api}
                  userName={userName}
                  getCookie={getCookie}
                  setLoad={setLoad}
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
                  <Route exact path='/admin/car-edit-card'>
                    <CarEditCard getCookie={getCookie} />{' '}
                  </Route>

                  <Route exact path='/admin/car-list'>
                    <CarListPage getCookie={getCookie} />
                  </Route>
                  <Route exact path='/admin/orders'>
                    <Orders getCookie={getCookie} />
                  </Route>
                  <Route exact path='/admin/points'>
                    <CityPointCard getCookie={getCookie} />
                  </Route>
                  <Route exact path='/admin/rate-list'>
                    <RatePage/>
                  </Route>
                  <Route exact path='/admin/points-list'>
                    <PointsPage getCookie={getCookie}/>
                  </Route>
                  <Route path='/admin/*' component={ErrorPage} />
                </Switch>
              </div>
              <div className='admin-panel__container__bottombar'>
                <Bottombar />
              </div>
            </div>
          </Route>
        </Switch>
      )}
    </div>
  );
}
