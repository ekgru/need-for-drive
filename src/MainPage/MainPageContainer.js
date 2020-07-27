import React from "react";
import Slider from "../Slider";
import Header from "../Header";
import "./MainPage.scss";
import MainPageInfoBlock from "./MainPageInfoBlock";
import MainPageFooter from "./MainPageFooter";
export default class MainPageContainer extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="main-page">
        <div className="main-page__content">
          <Header />
          <MainPageInfoBlock />
          <MainPageFooter />
        </div>
        <Slider />
      </div>
    );
  }
}
