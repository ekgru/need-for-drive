import React from 'react';
import MainPageContainer from './components/MainPage';
import NavBar from './components/NavBar';
import { Switch, Route } from 'react-router-dom';
import OrderPage from './components/OrderPage/';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPageContainer} />
        <Route path="/order-page/" component={OrderPage} />
      </Switch>
    </div>
  );
}

export default App;
