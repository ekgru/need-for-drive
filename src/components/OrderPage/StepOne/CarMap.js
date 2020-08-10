import React from 'react';
import { YMaps, Map, Placemark, Circle } from 'react-yandex-maps';

export default class CarMap extends React.Component {
  constructor(props) {
    super(props);
    this.getMarks = this.getMarks.bind(this);
    this.onLoadMap = this.onLoadMap.bind(this);

    this.state = {
      cityMarks: [],
      pointMarks: [],
    };
    this.ymaps = null;
  }
  getMarks(name) {
    this.props[name === 'cityMarks' ? 'cities' : 'points'].map((el) =>
      this.ymaps
        .geocode(
          name === 'cityMarks' ? el.name : `${el.cityId.name} ${el.address}`,
          {
            json: true,
            results: 1,
          },
        )
        .then((res) => {
          const point = res.GeoObjectCollection.featureMember[0].GeoObject;
          this.setState((prevState) => {
            return { [name]: [...prevState[name], point] };
          });
        }),
    );
  }

  onLoadMap(ymaps) {
    this.ymaps = ymaps;
    this.getMarks('pointMarks');
    this.getMarks('cityMarks');
  }

  render() {
    const { point, city, action } = this.props;
    const { pointMarks, cityMarks } = this.state;
    const params = {
      ns: 'use-load-option',
      apikey: '74a51f5a-db87-407e-a41b-db660460a9fb',
    };
    const modules = ['geolocation', 'geocode', 'geoObject.addon.hint'];
    const centerPointMark = pointMarks.find(
      (el) =>
        el.name
          .replace('улица ', '')
          .replace(' улица', '')
          .replace('проспект ', '')
          .replace(',', '') === point,
    );
    const centerCityMark = cityMarks.find((el) => el.name === city.name);

    return (
      <YMaps query={params} className='map'>
        <Map
          instanceRef={(map) => (this.map = map)}
          width='100%'
          height='100%'
          onLoad={(ymaps) => {
            this.onLoadMap(ymaps);
          }}
          defaultState={{
            center: [54.75, 49.57],
            zoom: 2,
          }}
          modules={modules}
          state={
            point && centerPointMark
              ? {
                  center: centerPointMark.Point.pos.split(' ', 2).reverse(),
                  zoom: 17,
                }
              : city.id && centerCityMark
              ? {
                  center: centerCityMark.Point.pos.split(' ', 2).reverse(),
                  zoom: 10,
                }
              : { center: [54.75, 49.57], zoom: 5 }
          }
        >
          {!city.id &&
            cityMarks.map((el, i) => (
              <Circle
                key={i}
                onClick={(event) => {
                  action(event, 'cityId', el.name);
                  this.map.setCenter(el.Point.pos.split(' ', 2).reverse(), 10, {
                    checkZoomRange: true,
                  });
                }}
                geometry={[el.Point.pos.split(' ', 2).reverse(), 20000]}
                options={{
                  interactiveZIndex: true,
                  fillColor: '#0ec26194',
                  strokeColor: '#0ec261',
                  strokeOpacity: 0.9,
                  strokeWidth: 1,
                }}
                properties={{ hintContent: el.request }}
              />
            ))}

          {city.id &&
            pointMarks.map((el, i) =>
              el.description.split(', ', 1)[0] === city.name ? (
                <Placemark
                  key={i}
                  onClick={(event) => {
                    const name = el.name
                      .replace('улица ', '')
                      .replace('проспект ', '')
                      .replace(',', '');
                    action(event, 'pointId', name);
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
                    preset: 'islands#autoCircleIcon',
                    iconColor: 'rgb(14 194 97)',
                    iconShadow: true,
                  }}
                  properties={{
                    iconCaption: el.name
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
