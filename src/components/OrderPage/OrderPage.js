import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../Header/';
import StepOne from './StepOne/';
import StepTwo from './StepTwo/';
import StepThree from './StepThree/';
import StepFour from './StepFour/';
import FinalPage from './FinalPage/';
import Total from './Total/';
import NavElement from './NavElement';
import './OrderPage.scss';
export default class OrderPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 0,
      completedStep: 0,
      cityId: { id: '', name: '' },
      pointId: { id: '', name: '' },
      car: '',
      carInfo: {},
      tariff: 'perMin',
      currentColor: 'Любой',
      dateFrom: 0,
      dateTo: 0,
      rateId: '',
      price: 0,
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stepNavigation = this.stepNavigation.bind(this);
    this.getCurrentCar = this.getCurrentCar.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleClick(event) {
    const { name } = event.target;
    this.setState((prevState) => {
      return { [name]: !prevState[name] };
    });
  }
  getLocation(name, info) {
    this.setState((prevState) =>
      name === 'pointId'
        ? { cityId: info.cityId || prevState.cityId, [name]: info }
        : { [name]: info },
    );
  }
  getCurrentCar(info) {
    this.setState({ carInfo: info, currentColor: 'Любой' });
  }
  stepNavigation() {
    +this.state.currentStep === +this.state.completedStep
      ? this.setState((prevState) => {
          return {
            currentStep: +prevState.currentStep + 1,
            completedStep: +prevState.completedStep + 1,
          };
        })
      : this.setState((prevState) => {
          return { currentStep: +prevState.currentStep + 1 };
        });
  }
  render() {
    const API = 'https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api/db/';
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    };
    const {
      isNeedChildChair,
      isRightWheel,
      isFullTank,
      orderNumber,
      currentStep,
      currentColor,
      completedStep,
      dateFrom,
      carInfo,
      tariff,
      dateTo,
      cityId,
      pointId,
    } = this.state;
    /* eslint-disable react/jsx-key */
    const steps = [
      <StepOne
        api={API}
        headers={headers}
        action={this.handleChange}
        city={cityId}
        point={pointId}
        getLocation={this.getLocation}
      />,
      <StepTwo
        actionCar={this.getCurrentCar}
        api={API}
        headers={headers}
        action={this.handleChange}
        currentCar={carInfo.name}
      />,
      <StepThree
        action={this.handleChange}
        actionClick={this.handleClick}
        currentColor={currentColor}
        colors={carInfo.colors}
        dateFrom={dateFrom}
        dateTo={dateTo}
        options={[isFullTank, isNeedChildChair, isRightWheel]}
        tariff={tariff}
      />,
      <StepFour carInfo={{}} />,
    ];
    const navigation = [
      { value: 0, description: 'Местоположение' },
      { value: 1, description: 'Модель' },
      { value: 2, description: 'Дополнительно' },
      { value: 3, description: 'Итого' },
    ];
    return (
      <div className='order-page'>
        <Header />
        {currentStep === 4 ? (
          <div className='final-page__nav'>
            <p>Заказ номер {orderNumber || 'RU58491823'}</p>
          </div>
        ) : (
          <div className='order-page__nav'>
            {navigation.map((el, i) => (
              <NavElement
                key={i}
                value={el.value}
                description={el.description}
                action={this.handleChange}
                completedStep={completedStep}
              />
            ))}
          </div>
        )}
        <div className='order-page__container'>
          <div className='order-page__container__form'>
            <Switch>
              <Route exact path='/order-page/final'>
                <FinalPage />
              </Route>
              <Route
                exact
                path={`/order-page/`}
                render={() => steps[currentStep]}
              />
            </Switch>
          </div>
          <div className='order-page__container__total'>
            <Total action={this.stepNavigation} params={this.state} />
          </div>
        </div>
      </div>
    );
  }
}
