import React from 'react';
import CarCard from './CarCard';
import './StepTwo.scss';
import CustomInput from '../../CustomInput';
export default class StepTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'all',
      cars: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { api, headers } = this.props;
    this.getCars();
    fetch(`${api}car`, {
      headers: headers,
    })
      .then((response) => response.json())
      .then(({ data }) => {
        this.setState({ cars: data });
      })
      .catch((err) => console.error('ERROR', err));
  }
  getCars() {
    const { action, actionCar, currentCar } = this.props;
    return this.state.cars.map((el, i) => (
      <CarCard
        display={
          this.state.category === 'all' ||
          this.state.category === el.categoryId.name
            ? ''
            : 'none'
        }
        action={action}
        getCar={actionCar}
        title={el.name}
        costMin={el.priceMin}
        costMax={el.priceMax}
        carInfo={el}
        pic={el.thumbnail.path}
        key={i}
        car={currentCar}
      />
    ));
  }

  handleChange(event) {
    this.setState({ category: event.target.value });
  }
  render() {
    const categories = [
      { value: 'all', check: true, description: 'Все модели' },
      { value: 'Эконом', check: false, description: 'Эконом' },
      { value: 'Премиум', check: false, description: 'Премиум' },
    ];
    return (
      <div className='car-selector'>
        <form
          className='car-selector__category-form'
          onChange={this.handleChange}
        >
          {categories.map((el, i) => (
            <CustomInput
              key={i}
              type='radio'
              name='model'
              value={el.value}
              defaultChecked={el.check}
              description={el.description}
            />
          ))}
        </form>
        <div className='car-selector__container'>
          <form className='car-selector__container__car-list'>
            {this.getCars()}
          </form>
        </div>
      </div>
    );
  }
}
