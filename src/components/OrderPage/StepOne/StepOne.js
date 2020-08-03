import React from 'react';
import './StepOne.scss';
import FakeMap from '../../../resources/FakeMap.jpg';
import CustomInput from '../../CustomInput';
export default class StepOne extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="step-one">
        <form className="step-one__form" action="">
          <CustomInput
            name="city"
            description="Город"
            type="text"
            placeholder="Введите название города"
            list="city"
            onChangeAction={this.props.action}
            value={this.props.city}
            onClickAction={''}
          />
          <datalist id="city">
            <option value="Ульяновск" />
            <option value="Краснодар" />
            <option value="Самара" />
            <option value="Саратов" />
          </datalist>
          <br />

          <CustomInput
            name="point"
            description="Пункт Выдачи"
            type="text"
            placeholder="Выберите пункт выдачи"
            list="point"
            onChangeAction={this.props.action}
            value={this.props.point}
          />
          <datalist id="point">
            <option value="Наримова 12" />
            <option value="Красная 33" />
            <option value="Пушкина 14" />
            <option value="Радужная 4" />
          </datalist>
        </form>

        <div className="map-block">
          <p className="map-block__description">Выбрать на карте:</p>
          <span>
            <img className="map" src={FakeMap} alt="" />
          </span>
        </div>
      </div>
    );
  }
}
