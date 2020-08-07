import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export default class CarMap extends React.Component {
  constructor(props) {
    super(props);
    this.getNameList = this.getNameList.bind(this);
    this.getCitiesMarks = this.getCitiesMarks.bind(this);
    this.getPointMarks = this.getPointMarks.bind(this);
    this.onLoadMap = this.onLoadMap.bind(this);

    this.state = {
      cityMarks: [],
      pointMarks: [],
      view: false,
    };
    this.ymaps = null;
  }
  componentDidMount() {
    this.getNameList();
  }
  getNameList() {
    const cities = this.props.cities.map((el) => el.name);
    const points = this.props.points.map((el) => {
      return { city: el.cityId.name, address: el.address };
    });
    this.setState({ cities: cities, points: points });
  }
  getCitiesMarks() {
    this.state.cities.map((el) =>
      this.ymaps.geocode(el).then((res) => {
        const point =
          res.geoObjects._geoObjectComponent._properties._data.metaDataProperty
            .GeocoderResponseMetaData;
        this.setState((prevState) => {
          return { cityMarks: [...prevState.cityMarks, point] };
        });
      }),
    );
  }

  getPointMarks() {
    this.state.points.map((el) =>
      this.ymaps
        .geocode(`${el.city} ${el.address}`, {
          json: true,
          results: 1,
        })
        .then((res) => {
          const point = res.GeoObjectCollection.featureMember[0].GeoObject;
          this.setState((prevState) => {
            return { pointMarks: [...prevState.pointMarks, point] };
          });
        }),
    );
  }
  onLoadMap(ymaps) {
    this.ymaps = ymaps;
    this.getPointMarks();
    this.getCitiesMarks();
    console.log(
      this.ymaps.geocode('Ульяновск Нариманова 42', {
        json: true,
        results: 1,
      }),
    );
  }

  render() {
    const params = {
      load: 'package.full',
      ns: 'use-load-option',
      apikey: '74a51f5a-db87-407e-a41b-db660460a9fb',
    };
    const modules = ['geolocation', 'geocode', 'geoObject.addon.hint'];
    const initialState = { center: [53.75, 50.57], zoom: 5 };
    return (
      <YMaps query={params} className='map'>
        <Map
          instanceRef={(map) => (this.map = map)}
          width='600px'
          height='400px'
          onLoad={(ymaps) => {
            this.onLoadMap(ymaps);
          }}
          modules={modules}
          defaultState={initialState}
        >
          {!this.props.city &&
            this.state.cityMarks.map((el, i) => (
              <Placemark
                onClick={(event) => {
                  this.props.action(event, 'cityId', el.request);
                  this.map.setCenter(
                    [el.Point.coordinates[1], el.Point.coordinates[0]],
                    10,
                    {
                      checkZoomRange: true,
                    },
                  );
                }}
                key={i}
                geometry={[el.Point.coordinates[1], el.Point.coordinates[0]]}
                options={{
                  preset: 'islands#circleDotIcon',
                  iconColor: 'rgb(14 194 97)',
                }}
                properties={{ hintContent: el.request }}
              />
            ))}
          {this.props.city &&
            this.state.pointMarks.map((el, i) =>
              el.description.split(', ', 1)[0] === this.props.city ? (
                <Placemark
                  key={i}
                  onClick={(event) => {
                    const name = el.name
                      .replace('улица ', '')
                      .replace('проспект ', '')
                      .replace(',', '');
                    this.props.action(event, 'pointId', name);
                    this.map.setCenter(
                      el.Point.pos.split(' ', 2).reverse(),
                      17,
                      {
                        checkZoomRange: true,
                      },
                    );
                  }}
                  geometry={el.Point.pos.split(' ', 2).reverse()}
                  options={{
                    preset: 'islands#icon',
                    iconColor: 'rgb(14 194 97)',
                    iconShadow: true,
                  }}
                  properties={{
                    hintContent: el.name
                      .replace('Улица ', '')
                      .replace('проспект ', '')
                      .replace(',', ''),
                  }}
                />
              ) : (
                ''
              ),
            )}
        </Map>
      </YMaps>
    );
  }
}
