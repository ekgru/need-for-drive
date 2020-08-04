import React from 'react';
import './StepOne.scss';
import FakeMap from '../../../resources/FakeMap.jpg';
import CustomInput from '../../CustomInput';
export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cities: [], points: [] };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { api, headers } = this.props;
    fetch(`${api}city`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({ cities: data });
      })
      .catch((err) => console.error('ERROR', err));
    fetch(`${api}point/`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({ points: data });
      })
      .catch((err) => console.error('ERROR', err));
  }
  handleChange(event, name) {
    const { cities, points } = this.state;
    const { getLocation } = this.props;
    const { value } = event.target;
    const resultObj =
      name === 'cityId'
        ? cities.filter((el) => el.name === value)
        : points.filter((el) => el.name === value);
    getLocation(name, resultObj[0] ? resultObj[0] : { name: value, id: '' });
  }
  render() {
    const { city, point, action } = this.props;
    return (
      <div className='step-one'>
        <form className='step-one__form'>
          <CustomInput
            name='cityId'
            description='Город'
            type='text'
            placeholder='Введите название города'
            list='city'
            onChangeAction={(event) => this.handleChange(event, 'cityId')}
            value={city}
            delAction={action}
          />
          <datalist id='city'>
            {this.state.cities.map((el, i) => (
              <option key={i} id={el.id} value={el.name}></option>
            ))}
          </datalist>
          <br />

          <CustomInput
            name='point'
            description='Пункт Выдачи'
            type='text'
            placeholder='Выберите пункт выдачи'
            list='point'
            onChangeAction={(event) => this.handleChange(event, 'pointId')}
            value={point}
          />
          <datalist id='point'>
            {this.state.points.map((el, i) =>
              el.cityId.name === city ? (
                <option key={i} id={el.id} value={el.name}></option>
              ) : (
                ''
              )
            )}
          </datalist>
        </form>

        <div className='map-block'>
          <p className='map-block__description'>Выбрать на карте:</p>
          <span>
            <img className='map' src={FakeMap} alt='' />
          </span>
        </div>
      </div>
    );
  }
}
