import React from 'react';
import MainPageContainer from './components/MainPage';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import OrderPage from './components/OrderPage/';
import AdminPanel from './components/AdminPanel';
function App() {
  return (
    <>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <NavBar /> <MainPageContainer />
          </Route>
          <Route path='/order-page/'>
            <NavBar /> <OrderPage />
          </Route>
          <Route path='/admin/' component={AdminPanel} />
        </Switch>
      </div>
    </>
  );
}

export default App;
