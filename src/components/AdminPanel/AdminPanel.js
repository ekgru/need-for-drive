import React from 'react';
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
export default class AdminPanel extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='admin-panel'>
        <Switch>
          <Route path='/admin/autorization' component={Authorization} />
          {new Date() < 0 ? <Redirect to='/admin/autorization' /> : ''}
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
                  <Route exact path='/admin/'>
                    <h1 className='admin__hello-text'>
                      Добро пожаловать, {/* username || */ 'администратор'}
                      !
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
}
