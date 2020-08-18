import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authorization from './Authorization';
import './AdminPanel.scss';
import Sidebar from './Sidebar';
import Topbar from './TopBar';
import Bottombar from './Bottombar';
import Orders from './Orders';
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
              <div className='admin-panel__container__content'><Orders/></div>
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
