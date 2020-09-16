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
          name === 'cityMarks'
            ? el.name
            : `${el.cityId.name} ${el.address}`,
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
  getPointName(string) {
    return string
      .replace(/(проспект|улица|[.,])/gi, '')
      .replace(/(\d+)(к\.?)(\d+)/i, '$1, корп.$3')
      .trim();
  }
  onLoadMap(ymaps) {
    this.ymaps = ymaps;
    this.getMarks('pointMarks');
    this.getMarks('cityMarks');
  }

  placemarkHandeler(el) {
    const name = this.getPointName(el.name).trim();
    this.props.action('', 'pointId', name);
    this.map.setCenter(el.Point.pos.split(' ', 2).reverse(), 17, {
      checkZoomRange: true,
    });
  }
  cityHandler(el) {
    this.props.action(
      '',
      'cityId',
      el.metaDataProperty.GeocoderMetaData.Address.Components.find(
        (el) => el.kind === 'locality',
      ).name,
    );
    this.map.setCenter(el.Point.pos.split(' ', 2).reverse(), 10, {
      checkZoomRange: true,
    });
  }

  render() {
    const { point, city } = this.props;
    const { pointMarks, cityMarks } = this.state;
    const params = {
      ns: 'use-load-option',
      apikey: '74a51f5a-db87-407e-a41b-db660460a9fb',
    };
    const modules = ['geolocation', 'geocode', 'geoObject.addon.hint'];
    const centerPointMark = pointMarks.find(
      (el) => this.getPointName(el.name).trim() === point,
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
                  center: centerPointMark.Point.pos
                    .split(' ', 2)
                    .reverse(),
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
            cityMarks.map((el) => (
              <Circle
                key={el.Point.pos}
                onClick={this.cityHandler.bind(this, el)}
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
            pointMarks.map((el) =>
              el.metaDataProperty.GeocoderMetaData.Address.Components.find(
                (el) => el.kind === 'locality',
              ).name === city.name ? (
                <Placemark
                  key={el.Point.pos}
                  onClick={this.placemarkHandeler.bind(this, el)}
                  geometry={el.Point.pos.split(' ', 2).reverse()}
                  options={{
                    preset: 'islands#autoCircleIcon',
                    iconColor: 'rgb(14 194 97)',
                    iconShadow: true,
                  }}
                  properties={{
                    iconCaption: this.getPointName(el.name),
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
