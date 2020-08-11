import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
      orderId: '',
      currentStep: 0,
      completedStep: 0,
      cityId: { id: '', name: '' },
      pointId: { id: '', name: '' },
      car: '',
      carInfo: {},
      currentColor: 'Любой',
      dateFrom: 0,
      dateTo: 0,
      rateId: { rateTypeId: {}, price: 0 },
      price: 0,
      isFullTank: false,
      isNeedChildChair: false,
      isRightWheel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stepNavigation = this.stepNavigation.bind(this);
    this.getInfo = this.getInfo.bind(this);
    this.getLocation = this.getLocation.bind(this);
    this.getPrice = this.getPrice.bind(this);
  }
  componentDidMount() {
    const id = localStorage.getItem('orderId');
    if (id) {
      this.setState({ orderId: id });
    }
  }
  handleChange(event) {
    const { name, value } = event.target;
    name !== 'cityId'
      ? this.setState({ [name]: value })
      : this.setState({
          cityId: { id: '', name: '' },
          pointId: { id: '', name: '' },
        });
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
  getInfo(name, info) {
    this.setState({ [name]: info });
    localStorage.setItem('orderId', info);
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
  getPrice() {
    const mins =
      (new Date(this.state.dateTo) - new Date(this.state.dateFrom)) / 60000;
    const options =
      (this.state.isFullTank && 500) +
      (this.state.isNeedChildChair && 200) +
      (this.state.isRightWheel && 1600);
    const result = Math.round(
      this.state.rateId.rateTypeId.name === 'Поминутно'
        ? mins * this.state.rateId.price + options
        : (mins / 1440) * this.state.rateId.price + options,
    );
    return result;
  }

  render() {
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
      rateId,
      dateTo,
      cityId,
      pointId,
      orderId,
    } = this.state;

    const API = 'http://api-factory.simbirsoft1.com/api/db/';
    const headers = {
      'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
    };

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
        actionCar={this.getInfo}
        api={API}
        headers={headers}
        action={this.handleChange}
        currentCar={carInfo.name}
      />,
      <StepThree
        api={API}
        headers={headers}
        action={this.handleChange}
        actionClick={this.handleClick}
        actionInfo={this.getInfo}
        currentColor={currentColor}
        colors={carInfo.colors}
        dateFrom={dateFrom}
        dateTo={dateTo}
        options={[isFullTank, isNeedChildChair, isRightWheel]}
        tariff={rateId.rateTypeId.name}
      />,
      <StepFour carInfo={carInfo} dateFrom={dateFrom} />,
    ];
    const navigation = [
      { value: 0, description: 'Местоположение' },
      { value: 1, description: 'Модель' },
      { value: 2, description: 'Дополнительно' },
      { value: 3, description: 'Итого' },
    ];
    const orderData = {
      cityId: { id: cityId.id },
      pointId: { id: pointId.id },
      carId: { id: carInfo.id },
      color: currentColor,
      dateFrom: new Date(dateFrom),
      dateTo: new Date(dateTo),
      rateId: { id: rateId.id },
      price: this.getPrice(),
      isFullTank: isFullTank,
      isNeedChildChair: isNeedChildChair,
      isRightWheel: isRightWheel,
    };
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
              {orderId ? (
                <Redirect
                  from='/order-page/'
                  to={`/order-page/order/${orderId}`}
                />
              ) : (
                ''
              )}
              {orderId && (
                <Route exact path={`/order-page/order${orderId}`}>
                  <FinalPage api={API} headers={headers} orderId={orderId} />
                </Route>
              )}
              <Redirect
                from='/order-page/order'
                to={orderId ? `/order-page/order/${orderId}` : `/order-page/`}
              />
              <Route
                exact
                path={`/order-page/`}
                render={() => steps[currentStep]}
              />
            </Switch>
          </div>
          <div className='order-page__container__total'>
            <Total
              api={API}
              action={this.stepNavigation}
              params={this.state}
              getPrice={this.getPrice}
              orderData={orderData}
              getInfo={this.getInfo}
            />
          </div>
        </div>
      </div>
    );
  }
}
