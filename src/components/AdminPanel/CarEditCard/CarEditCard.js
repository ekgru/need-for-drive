import React from 'react';
import './CarEditCard.scss';
import fakeCar from '../../../resources/car.png';
import AdminRequest from '../AdminRequest';
import AdminTextInput from '../AdminTextInput';
import { withRouter } from 'react-router-dom';
import AdminLoader from '../AdminLoader';
import AdminFinalBlock from '../AdminFinalBlock';

export default withRouter(
  class CarEditCard extends React.Component {
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
        errors: {
          addColor: false,
          description: false,
          file: false,
          model: false,
        },
        tank: 100,
        priceMax: 50000,
        priceMin: 0,
        isSave: false,
        isLoad: false,
      };
      this.handleChange = this.handleChange.bind(this);
      this.addColor = this.addColor.bind(this);
      this.createNewCar = this.createNewCar.bind(this);
      this.deleteCar = this.deleteCar.bind(this);
      this.clearState = this.clearState.bind(this);
      this.fileHandler = this.fileHandler.bind(this);
      this.closeAlert = this.closeAlert.bind(this);
      this.getCarById = this.getCarById.bind(this);
      this.id = 0;
    }
    componentDidMount() {
      this.getCarById();
    }
    getCarById() {
      this.id = this.props.match.params.id;
      if (this.id) {
        this.setState({ isLoad: true });
        new AdminRequest(
          `db/car/${this.id}`,
          'GET',
          `Bearer ${this.props.getCookie('access_token')}`,
        )
          .doRequest()
          .then(({ data }) =>
            this.setState({
              model: data.name,
              type: '',
              colors: data.colors,
              file: data.thumbnail,
              addColor: '',
              priceMax: data.priceMax,
              priceMin: data.priceMin,
              category: data.categoryId.id,
              description: data.description,
              errors: {
                addColor: false,
                description: false,
                file: false,
                model: false,
              },
              isLoad: false,
            }),
          )
          .catch((err) => {
            this.props.history.push('/admin/error-page');
            console.error('ERROR', err);
          });
      }
    }
    clearState() {
      this.setState({
        model: '',
        type: '',
        colors: [],
        file: '',
        category: '5e25c99a099b810b946c5d63',
        addColor: '',
        description: '',
        errors: {
          addColor: false,
          description: false,
          file: false,
          model: false,
        },
        tank: 100,
        priceMax: 50000,
        priceMin: 0,
        isSave: false,
        isLoad: false,
      });
    }
    handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value });
      if (value === '') {
        this.setState((prevState) => {
          return { errors: { ...prevState.errors, [name]: false } };
        });
      }
    }
    addColor(event) {
      event.preventDefault();
      if (!this.state.colors.includes(this.state.addColor)) {
        this.setState((prevState) => ({
          colors: [...prevState.colors, prevState.addColor],
          addColor: '',
          errors: { ...prevState.errors, addColor: false },
        }));
      } else {
        this.setState((prevState) => {
          return { errors: { ...prevState.errors, addColor: true } };
        });
      }
    }
    fileHandler(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({
          file: file,
          fileToSend: reader.result,
        });
      };
      reader.onerror = () => console.log(reader.error);
    }
    deleteCar() {
      new AdminRequest(
        `db/car/${this.id}`,
        'DELETE',
        `Bearer ${this.props.getCookie('access_token')}`,
      )
        .doRequest()
        .then(() => this.clearState())
        .then(() => (this.id = 0))
        .catch((err) => {
          this.props.history.push('/admin/error-page');
          console.error('ERROR', err);
        });
    }
    createNewCar() {
      const {
        model,
        fileToSend,
        file,
        description,
        category,
        colors,
        priceMax,
        priceMin,
      } = this.state;
      const data = {
        priceMax: priceMax,
        priceMin: priceMin,
        name: model,
        thumbnail: this.id
          ? file
          : {
              originalname: file.name,
              mimetype: file.type,
              size: file.size,
              path: fileToSend,
            },
        description: description,
        categoryId: { id: category },
        colors: colors,
      };
      const req = this.id
        ? new AdminRequest(
            `db/car/${this.id}`,
            'PUT',
            `Bearer ${this.props.getCookie('access_token')}`,
            data,
          )
        : new AdminRequest(
            `db/car`,
            'POST',
            `Bearer ${this.props.getCookie('access_token')}`,
            data,
          );
      req
        .doRequest()
        .then(() => this.setState({ isSave: true }))
        .then(() => {
          this.clearState();
        })
        .catch((err) => {
          this.props.history.push('/admin/error-page');
          console.error('ERROR', err);
        });
    }
    closeAlert() {
      this.setState({ isSave: false });
    }
    colorCheckHandler(i) {
      this.setState((prevState) => {
        const newArray = [...prevState.colors];
        newArray.splice(i, 1);
        return { colors: newArray };
      });
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
          {this.state.isSave && (
            <AdminFinalBlock
              text='Успех машина сохранена!'
              closeAction={this.closeAlert}
            />
          )}
          <h1 className='admin__heading'>Карточка автомобиля</h1>
          {this.state.isLoad ? (
            <AdminLoader />
          ) : (
            <div className='car-edit__container'>
              <div className='car-edit__container__car-block'>
                <img
                  crossOrigin='anonymous'
                  referrerPolicy='origin'
                  className='car-edit__container__car-block__img'
                  src={
                    this.state.file && !this.id
                      ? URL.createObjectURL(this.state.file)
                      : this.id
                      ? `http://api-factory.simbirsoft1.com${this.state.file.path}`
                      : fakeCar
                  }
                  alt='car'
                />
                <h2>{this.state.model || 'Название автомобиля'}</h2>
                <h3>{this.state.type || 'Тип автомобиля'}</h3>
                <form
                  id='file-form'
                  className='car-edit__container__car-block__file-form'
                >
                  <label
                    className='admin__file-loader'
                    htmlFor='fileLoader'
                  >
                    <span className='admin__file-loader__text'>
                      {this.state.file
                        ? this.state.file.name
                        : 'Выберите файл...  *'}
                    </span>
                    <input
                      id='fileLoader'
                      type='file'
                      name='file'
                      accept='image/*'
                      required
                      onChange={this.fileHandler}
                    />
                    <span className='admin__file-loader__button'>
                      Обзор
                    </span>
                  </label>
                </form>
                <div className='counter'>
                  <p className='counter__text'>
                    Заполнено:
                  </p>
                  <p className='counter__text'>
                    {procentes || 0}%
                  </p>
                  <span className='counter__container'>
                    <span
                      style={{ width: `${procentes || 0}%` }}
                      className='counter__container__line'
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
                <div className='car-edit__container__additional-block__form'>
                  <h2>Настройки автомобиля</h2>
                  <span className='car-edit__container__additional-block__form__group'>
                    <AdminTextInput
                      placeholder='Введите модель автомобиля'
                      legend='Модель автомобиля *'
                      onChange={this.handleChange}
                      value={this.state.model}
                      name='model'
                      error={this.state.errors.model}
                      errorText='Некорректное название автомобиля'
                    />
                    <AdminTextInput
                      placeholder='Введите тип автомобиля'
                      legend='Тип автомобиля'
                      onChange={this.handleChange}
                      value={this.state.type}
                      name='type'
                      error={false}
                      errorText=''
                    />
                  </span>
                  <span className='car-edit__container__additional-block__form__group'>
                    <fieldset>
                      <legend>Класс автомобиля *</legend>
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
                    <form onSubmit={this.addColor}>
                      <span>
                        <AdminTextInput
                          placeholder='Введите цвет'
                          legend='Доступные цвета  *'
                          onChange={this.handleChange}
                          value={this.state.addColor}
                          name='addColor'
                          error={this.state.errors.addColor}
                          errorText='Этот цвет уже выбран'
                        />
                        <button
                          className='plus-btn'
                          type='submit'
                          disabled={this.state.addColor ? false : true}
                        >
                          <span></span>
                        </button>
                      </span>
                    </form>
                    <div className='car-edit__container__additional-block__form__group__checkboxes'>
                      {this.state.colors.map((el, i) => (
                        <label key={+new Date() + i}>
                          <input
                            type='checkbox'
                            defaultChecked
                            onChange={this.colorCheckHandler.bind(this, i)}
                          />
                          <span>{el}</span>
                        </label>
                      ))}
                    </div>
                  </span>
                </div>
                <div className='car-edit__container__additional-block__btn-bar'>
                  <span>
                    <button
                      className='admin__button blue'
                      disabled={
                        (!this.state.model ||
                          !this.state.file ||
                          !this.state.colors.length) &&
                        'disabled'
                      }
                      onClick={this.createNewCar}
                    >
                      Сохранить
                    </button>
                    <button
                      onClick={this.id ? this.getCarById : this.clearState}
                      className='admin__button gray'
                    >
                      Отменить
                    </button>
                  </span>
                  <span>
                    <button
                      disabled={!this.id && 'disabled'}
                      onClick={this.deleteCar}
                      className='admin__button red'
                    >
                      Удалить
                    </button>
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
  },
);
