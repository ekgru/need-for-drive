import React from "react";
import Slider from "./Slider";

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
        <MainPageInfoBlock />
        <Slider />
        <MainPageFooter />
      </div>
    );
  }
}
