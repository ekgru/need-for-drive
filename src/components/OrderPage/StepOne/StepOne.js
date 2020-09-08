import React from 'react';
import './StepOne.scss';
import CustomInput from '../../CustomInput';
import CarMap from './CarMap';
import Loader from './Loader';

export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cities: [], points: [] };
    this.handleChange = this.handleChange.bind(this);
    this.controller = new AbortController();
  }
  componentDidMount() {
    const { api, headers } = this.props;
    fetch(`${api}city`, {
      headers: headers,
      signal: this.controller.signal,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({ cities: data });
      })
      .catch((err) => console.error('ERROR', err));
    fetch(`${api}point/`, {
      headers: headers,
      signal: this.controller.signal,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({ points: data });
      })
      .catch((err) => console.error('ERROR', err));
  }
  componentWillUnmount() {
    this.controller.abort();
  }
  handleChange(event, name, customValue) {
    const { cities, points } = this.state;
    const { getLocation } = this.props;
    const value = event ? event.target.value : customValue;

    const resultObj =
      name === 'cityId'
        ? cities.filter(
            (el) =>
              el.name.replace(/ +/g, ' ') === value.replace(/ +/g, ' '),
          )
        : points.filter(
            (el) =>
              el.address.replace(/ +/g, ' ') === value.replace(/ +/g, ' '),
          );
    console.log(resultObj);
    getLocation(
      name,
      resultObj[0] ? resultObj[0] : { name: value, id: '' },
    );
  }
  render() {
    const { city, point, action } = this.props;
    return (
      <div className='step-one'>
        <form className='step-one__form'>
          <CustomInput
            name='cityId'
            description='Город'
            placeholder='Выберите город'
            type='text'
            list='city'
            onChangeAction={(event) => this.handleChange(event, 'cityId')}
            value={city.name}
            delAction={action}
          />
          <datalist id='city'>
            {this.state.cities.map((el, i) =>
              !point.id ? (
                <option key={i} id={el.id} value={el.name}></option>
              ) : el.name === point.cityId.name ? (
                <option key={i} id={el.id} value={el.name}></option>
              ) : (
                ''
              ),
            )}
          </datalist>
          <br />

          <CustomInput
            name='point'
            description='Пункт Выдачи'
            placeholder={
              !city.name ||
              !city.id ||
              !this.state.points.find((el) => el.cityId.name === city.name)
                ? 'Нет доступных пунктов'
                : 'Выберите точку выдачи'
            }
            disabled={
              !city.name ||
              !city.id ||
              !this.state.points.find((el) => el.cityId.name === city.name)
                ? true
                : false
            }
            type='text'
            list='point'
            onChangeAction={(event) => this.handleChange(event, 'pointId')}
            value={point.name}
          />
          <datalist id='point'>
            {this.state.points.map((el, i) =>
              el.cityId.name === city.name ? (
                <option key={i} id={el.id} value={el.address}>
                  {el.name}
                </option>
              ) : (
                ''
              ),
            )}
          </datalist>
        </form>

        <div className='map-block'>
          <p className='map-block__description'>Выбрать на карте:</p>
          {(this.state.cities.length && this.state.points.length && (
            <div className='map-block__map-container'>
              <CarMap
                action={this.handleChange}
                cities={this.state.cities}
                points={this.state.points}
                city={city}
                point={point.address}
              />
            </div>
          )) || (
            <div className='loader-container'>
              <Loader />
            </div>
          )}
        </div>
      </div>
    );
  }
}
