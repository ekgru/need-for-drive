import React from "react";
import MainPageContainer from "./MainPage/";
import NavBar from "./NavBar/";
import { Switch, Route } from "react-router-dom";
import OrderPage from "./OrderPage/";
// import FinalPage from "./OrderPage/FinalPage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/need-for-drive" component={MainPageContainer} />
        <Route path="/need-for-drive/order-page/" component={OrderPage} />
      </Switch>
    </div>
  );
}

export default App;
