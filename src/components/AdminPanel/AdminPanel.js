import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Authorization from './Authorization';
import './AdminPanel.scss';
export default class AdminPanel extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='admin-panel'>
        <Switch>
          <Route path='/admin/autorization' component={Authorization} />
          {new Date() > 0 ? <Redirect to='/admin/autorization' /> : ''}
          <h1>Hello world!</h1>
          {/* <Route path='/admin/autorization' component={OrderPage} /> */}
        </Switch>
      </div>
    );
  }
}
