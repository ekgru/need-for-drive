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
      cityId: '',
      city: '',
      pointId: '',
      point: '',
      carId: '',
      car: '',
      tariff: 'perMin',
      color: 'Любой',
      dateFrom: 0,
      dateTo: 0,
      rateId: '',
      price: 0,
      isFullTank: true,
      isNeedChildChair: false,
      isRightWheel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.stepNavigation = this.stepNavigation.bind(this);
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
    const {
      city,
      point,
      isNeedChildChair,
      isRightWheel,
      isFullTank,
      orderNumber,
      currentStep,
      color,
      completedStep,
      dateFrom,
      dateTo,
    } = this.state;
    /* eslint-disable react/jsx-key */
    const steps = [
      <StepOne action={this.handleChange} city={city} point={point} />,
      <StepTwo action={this.handleChange} />,
      <StepThree
        action={this.handleChange}
        actionClick={this.handleClick}
        color={color}
        dateFrom={dateFrom}
        dateTo={dateTo}
        options={[isFullTank, isNeedChildChair, isRightWheel]}
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
          <section className='order-page__container__form'>
            <Switch>
              <Route exact path='/need-for-drive/order-page/final'>
                <FinalPage />
              </Route>
              <Route
                exact
                path={`/need-for-drive/order-page/`}
                render={() => steps[currentStep]}
              />
            </Switch>
          </section>
          <section className='order-page__container__total'>
            <Total action={this.stepNavigation} params={this.state} />
          </section>
        </div>
      </div>
    );
  }
}
