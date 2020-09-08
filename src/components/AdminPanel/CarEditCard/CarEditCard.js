import React from 'react';
import './CarEditCard.scss';
import fakeCar from '../../../resources/car.png';
import AdminRequest from '../AdminRequest';

export default class CarEditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: '',
      type: '',
      colors: [],
      file: '',
      category: '5e25c99a099b810b946c5d63',
      addColor: '',
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addColor = this.addColor.bind(this);
    this.createNewCar = this.createNewCar.bind(this);
    this.fileHandler = this.fileHandler.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  addColor() {
    this.setState((prevState) => ({
      colors: [...prevState.colors, prevState.addColor],
      addColor: '',
    }));
  }
  fileHandler(event) {
    this.setState({
      // file: new FormData(document.getElementById('file-form')),
      file: event.target.files[0],
    });
  }
  createNewCar() {
    const { model, file, description, category, colors } = this.state;
    const data = {
      priceMax: 50000,
      prixeMin: 1000,
      name: model,
      thumbnail: new FormData(document.getElementById('file-form')),
      description: description,
      categoryId: { id: category },
      colors: colors,
    };
    const req = new AdminRequest(
      `db/car`,
      'POST',
      `Bearer ${this.props.getCookie('access_token')}`,
      data
    );
    req.doRequest().then((res) => console.log(res));
    console.log(data)
  }

  render() {
    const procentes =
      +(this.state.model && 20) +
      +(this.state.type && 20) +
      +(this.state.colors.length && 20) +
      +(this.state.file && 20) +
      +(this.state.description && 20);

    return (
      <>
        <h1 className='admin__heading'>Карточка автомобиля</h1>
        <div className='car-edit__container'>
          <div className='car-edit__container__car-block'>
            <img
              crossOrigin='anonymous'
              referrerPolicy='origin'
              className='car-edit__container__car-block__img'
              src={
                this.state.file
                  ? URL.createObjectURL(this.state.file)
                  : fakeCar
              }
              // src={`http://api-factory.simbirsoft1.com${thumbnail.path}`}
              alt='car'
            />
            <h2>{this.state.model || 'Название автомобиля'}</h2>
            <h3>{this.state.type || 'Тип автомобиля'}</h3>
            <form
              id='file-form'
              className='car-edit__container__car-block__file-form'
            >
              <label className='admin__file-loader' htmlFor='fileLoader'>
                <span className='admin__file-loader__text'>
                  {this.state.file
                    ? this.state.file.name
                    : 'Выберите файл...'}
                </span>
                <input
                  id='fileLoader'
                  type='file'
                  name='file'
                  accept='image/*'
                  required
                  onChange={this.fileHandler}
                />
                <span className='admin__file-loader__button'>Обзор</span>
              </label>
            </form>
            <div className='car-edit__container__car-block__counter'>
              <p className='car-edit__container__car-block__counter__text'>
                Заполнено:
              </p>
              <p className='car-edit__container__car-block__counter__text'>
                {procentes || 0}%
              </p>
              <span className='car-edit__container__car-block__counter__container'>
                <span
                  style={{ width: `${procentes || 0}%` }}
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
                value={this.state.description}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className='car-edit__container__additional-block'>
            <form className='car-edit__container__additional-block__form'>
              <h2>Настройки автомобиля</h2>
              <span className='car-edit__container__additional-block__form__group'>
                <fieldset>
                  <legend>Модель автомобиля</legend>
                  <input
                    onChange={this.handleChange}
                    type='text'
                    className='admin__input'
                    name='model'
                    value={this.state.model}
                    placeholder='Введите модель автомобиля'
                  />
                </fieldset>
                <fieldset>
                  <legend>Тип автомобиля</legend>
                  <input
                    onChange={this.handleChange}
                    type='text'
                    className='admin__input'
                    name='type'
                    placeholder='Введите тип автомобиля'
                    value={this.state.type}
                  />
                </fieldset>
              </span>
              <span className='car-edit__container__additional-block__form__group'>
                <fieldset>
                  <legend>Класс автомобиля</legend>
                  <label className='admin__radio'>
                    <input
                      type='radio'
                      name='category'
                      value='5e25c98d099b810b946c5d62'
                      id='econom'
                      onChange={this.handleChange}
                    />
                    <span>Эконом</span>
                  </label>
                  <label className='admin__radio'>
                    <input
                      type='radio'
                      name='category'
                      defaultChecked
                      id='premium'
                      value='5e25c99a099b810b946c5d63'
                      onChange={this.handleChange}
                    />
                    <span>Премиум</span>
                  </label>
                </fieldset>
              </span>
              <span className='car-edit__container__additional-block__form__group'>
                <fieldset>
                  <legend>Доступные цвета</legend>
                  <span>
                    <input
                      type='text'
                      className='admin__input'
                      name='addColor'
                      placeholder='Введите цвет'
                      onChange={this.handleChange}
                      value={this.state.addColor}
                    />
                    <button
                      className='plus-btn'
                      type='button'
                      disabled={this.state.addColor ? false : true}
                      onClick={this.addColor}
                    >
                      <span></span>
                    </button>
                  </span>
                </fieldset>
                {this.state.colors.map((el) => (
                  <label key={el}>
                    <input type='checkbox' readOnly checked />
                    <span>{el}</span>
                  </label>
                ))}
              </span>
            </form>
            <div className='car-edit__container__additional-block__btn-bar'>
              <span>
                <button
                  className='admin__button blue'
                  onClick={this.createNewCar}
                >
                  Сохранить
                </button>
                <button className='admin__button gray'>Отменить</button>
              </span>
              <span>
                <button className='admin__button red'>Удалить</button>
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
}
