import React from 'react';
import './CarEditCard.scss';
import fakeCar from '../../../resources/car.png';

export default class CarEditCard extends React.Component {
  constructor() {
    super();
    this.state = {
      model: '',
      type: '',
      colors: ['Красный', 'Синий'],
      file: '',
      category: '',
    };
  }
  render() {
    const procentes =
      +(this.state.model && 20) +
      +(this.state.type && 20) +
      +(this.state.colors[0] && 20) +
      +(this.state.file && 20) +
      +(this.state.category && 20);
    return (
      <>
        <h1 className='admin__heading'>Карточка автомобиля</h1>
        <span className='car-edit__container'>
          <div className='car-edit__container__car-block'>
            <img
              crossOrigin='anonymous'
              referrerPolicy='origin'
              className='car-edit__container__car-block__img'
              src={fakeCar}
              // src={`http://api-factory.simbirsoft1.com${thumbnail.path}`}
              alt='car'
            />
            <form
              action=''
              className='car-edit__container__car-block__file-form'
            >
              <label className='admin__file-loader' htmlFor='fileLoader'>
                <span className='admin__file-loader__text'>
                  {this.state.file || 'Выберите файл...'}
                </span>
                <input
                  id='fileLoader'
                  type='file'
                  name='file'
                  accept='image/*'
                  required
                  onChange={(event) =>
                    this.setState({ file: event.target.value })
                  }
                />
                <span className='admin__file-loader__button'>Обзор</span>
              </label>
            </form>
            <div className='car-edit__container__car-block__counter'>
              <p className='car-edit__container__car-block__counter__text'>
                Заполнено:
              </p>
              <p className='car-edit__container__car-block__counter__text'>
                {procentes}%
              </p>
              <span className='car-edit__container__car-block__counter__container'>
                <span
                  style={{ width: `${procentes}%` }}
                  className='car-edit__container__car-block__counter__container__line'
                ></span>
              </span>
            </div>
            <div className='car-edit__container__car-block__description'>
              <p className='car-edit__container__car-block__description__text'>
                Описание
              </p>
              <textarea
                className='admin__textarea'
                name='description'
                cols='30'
                rows='5'
                maxLength='196'
                placeholder='Введите описание автомобиля'
              />
            </div>
          </div>

          <div className='car-edit__container__additional-block'>
            <form action=''>
              <span>
                <fieldset>
                  <legend>Модель автомобиля</legend>
                  <input
                    type='text'
                    name='carName'
                    placeholder='Введите модель автомобиля'
                  />
                </fieldset>
                <fieldset>
                  <legend>Тип автомобиля</legend>
                  <input
                    type='text'
                    name='carType'
                    placeholder='Введите тип автомобиля'
                  />
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <legend>Класс автомобиля</legend>
                  <label>
                    <input type='radio' name='category' id='econom' />
                    <span>Эконом</span>
                  </label>
                  <label>
                    <input type='radio' name='category' id='premium' />
                    <span>Премиум</span>
                  </label>
                </fieldset>
              </span>
              <span>
                <fieldset>
                  <legend>Доступные цвета</legend>
                  <input
                    type='text'
                    name='color'
                    placeholder='Введите цвет'
                  />
                </fieldset>
                {this.state.colors.map((el, i) => (
                  <label key={el}>
                    <input type='checkbox' readOnly checked />
                    <span>{el}</span>
                  </label>
                ))}
              </span>
            </form>
          </div>
        </span>
      </>
    );
  }
}
