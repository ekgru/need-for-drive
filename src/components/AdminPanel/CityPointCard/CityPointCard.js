import React from 'react';
import './CityPointCard.scss';
import CityPointMap from './CityPointMap';
import AdminRequest from '../AdminRequest';
export default class CityPointCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pointName: '',
      address: '',
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.handler = this.handler.bind(this);
  }
  onChangeHandler(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handler(info) {
    this.setState({ address: info });
  }
  createPoint() {
    const currentCity = this.state.address.metaDataProperty.GeocoderMetaData.Address.Components.find(
      (el) => el.kind === 'locality',
    ).name;
    new AdminRequest('db/city/', 'GET')
      .doRequest()
      .then(({ data }) => this.setState({ cities: data }))
      .then(() => {
        const city = this.state.cities.filter(
          (el) => el.name === currentCity,
        );
        if (city.length) {
          new AdminRequest(
            'db/point',
            'POST',
            `Bearer ${this.props.getCookie('access_token')}`,
            {
              name: this.state.pointName,
              cityId: city[0],
              address: this.state.address.name,
            },
          ).doRequest();
        } else {
          new AdminRequest(
            'db/city',
            'POST',
            `Bearer ${this.props.getCookie('access_token')}`,
            { name: currentCity },
          )
            .doRequest()
            .then(({ data }) =>
              new AdminRequest(
                'db/point',
                'POST',
                `Bearer ${this.props.getCookie('access_token')}`,
                {
                  name: this.state.pointName,
                  cityId: data,
                  address: this.state.address.name,
                },
              ).doRequest(),
            );
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    return (
      <>
        <h1 className='admin__heading'>Добавление точки выдачи</h1>
        <div className='city-point-card'>
          <div className='city-point-card__content'>
            <h3 className='admin__heading'>Укажите точку на карте:</h3>
            <div className='city-point-card__map'>
              <CityPointMap handler={this.handler} />
            </div>

            <div className='city-point-card__content__info'>
              <h2 className='city-point-card__content__info__head'>
                Добавление точки:
              </h2>
              <fieldset>
                <legend>Введите название новой точки выдачи</legend>
                <input
                  onChange={this.onChangeHandler}
                  className='admin__input'
                  type='text'
                  name='pointName'
                />
              </fieldset>
              <p className='city-point-card__content__info__text'>
                <span className='city-point-card__content__info__text__bold'>
                  Название точки:
                </span>
                {this.state.pointName || 'Укажите название'}
              </p>
              {this.state.address ? (
                <>
                  <p className='city-point-card__content__info__text'>
                    <span className='city-point-card__content__info__text__bold'>
                      Город:
                    </span>
                    {
                      this.state.address.metaDataProperty.GeocoderMetaData.Address.Components.find(
                        (el) => el.kind === 'locality',
                      ).name
                    }
                  </p>
                  <p className='city-point-card__content__info__text'>
                    <span className='city-point-card__content__info__text__bold'>
                      Адрес:
                    </span>
                    {this.state.address.name}
                  </p>
                  <p className='city-point-card__content__info__text'>
                    <span className='city-point-card__content__info__text__bold'>
                      Координаты:
                    </span>
                    {this.state.address.Point.pos}
                  </p>
                </>
              ) : (
                <p className='city-point-card__content__info__text'>
                  Адрес не указан или указан некорректно.
                </p>
              )}
              <div className='city-point-card__content__info__btn-bar'>
                <button
                  className='admin__button blue'
                  onClick={this.createPoint.bind(this)}
                >
                  Сохранить
                </button>
                <button className='admin__button red'>Отменить</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
