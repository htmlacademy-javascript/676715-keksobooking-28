// import {getSimilarAds} from './data.js';
// import {getData} from './api.js';
// import {showAlert} from './util.js';
import {addressField} from './form.js';
import {renderAd} from './ads.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 13;
const mainIconConfig = {
  url: '../img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52
};
const iconConfig = {
  url: '../img/pin.svg',
  width: 40,
  height: 40,
  anchorX: 20,
  anchorY: 40
};
const cityCenter = {
  lat: 35.68149,
  lng: 139.76719,
};
let mainMarker;
let mainMarkerTempCoordinate;
let mainMarkerCoordinate;
let map;


// ------- рабочий вариант - карта + маркер объявления из формы + маркеры объявлений с сервера, а в main.js только 1 строка - import './map.js';
// import {getData} from './api.js';
// import {showAlert} from './util.js';
// import {addressField} from './form.js';
// import {renderAd} from './ads.js';

// const map = L.map('map-canvas').on('load', () => {
//   console.log('Карта инициализирована');
// }).setView(cityCenter, ZOOM);
// L.tileLayer(TILE_LAYER, {attribution: COPYRIGHT}).addTo(map);

// const mainIcon = L.icon({
//   iconUrl: mainIconConfig.url,
//   iconSize: [mainIconConfig.width, mainIconConfig.height],
//   iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY]
// });

// const mainMarker = L.marker(cityCenter, {
//   draggable: true,
//   icon: mainIcon
// });

// mainMarker.addTo(map);
// mainMarker.on('moveend', (evt) => {
//   mainMarkerTempCoordinate = Object.values(evt.target.getLatLng());
//   mainMarkerCoordinate = mainMarkerTempCoordinate.map((coordinate) => coordinate.toFixed(5)).join(', ');
//   // console.log(`mainMarkerCoordinate: ${mainMarkerCoordinate}`);
//   addressField.value = mainMarkerCoordinate;
// });

// // Если основная метка не сдвинута, то её координаты равны координатам центра города

// if (!mainMarkerCoordinate) {
//   addressField.value = Object.values(cityCenter).join(', ');
// }

// const icon = L.icon({
//   iconUrl: iconConfig.url,
//   iconSize: [iconConfig.width, iconConfig.height],
//   iconAnchor: [iconConfig.anchorX, iconConfig.anchorY]
// });

// const renderMarkers = (ads) => {
//   // const renderMarkers = (data) => {
//   // временно первые 5 объявлений
//   // const ads = data.slice(0, 5);
//   console.log (ads);
//   ads.forEach(({author, location, offer}) => {
//     const lat = (location.lat).toFixed(5);
//     const lng = (location.lng).toFixed(5);
//     const marker = L.marker(
//       {
//         lat,
//         lng
//       },
//       {
//         icon
//       }
//     );
//     marker.addTo(map).bindPopup(renderAd({author, offer}));
//   });
// };

// try {
//   const data = await getData();
//   // debugger;
//   renderMarkers(data);
// } catch (err) {
//   showAlert(err.message);
// }
// -----

// новый вариант

const renderMap = () => {
  // c console.log
  // map = L.map('map-canvas').on('load', () => {
  //   console.log('Карта инициализирована');
  // }).setView(cityCenter, ZOOM);

  // без console.log
  map = L.map('map-canvas').setView(cityCenter, ZOOM);

  L.tileLayer(TILE_LAYER, {attribution: COPYRIGHT}).addTo(map);
};

const resetMainMarker = () => {
  // вариант до доработок
  // if (!mainMarkerCoordinate) {
  //   addressField.value = Object.values(cityCenter).join(', ');
  // }

  // удаление маркера
  //
  // if (addressField.value === 0) {
  //   mainMarker.remove();
  // }
  // if (!mainMarkerCoordinate) {
  mainMarker.setLatLng(cityCenter);
  console.log(`addressField.value до обнуления: ${addressField.value}`);
  addressField.value = Object.values(cityCenter).join(', ');
  console.log(`addressField.value с координатами центра: ${addressField.value}`);
  // return addressField.value;
  // }
};

const renderMainMarker = () => {
  const mainIcon = L.icon({
    iconUrl: mainIconConfig.url,
    iconSize: [mainIconConfig.width, mainIconConfig.height],
    iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY]
  });

  mainMarker = L.marker(cityCenter, {
    draggable: true,
    icon: mainIcon
  });

  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    mainMarkerTempCoordinate = Object.values(evt.target.getLatLng());
    mainMarkerCoordinate = mainMarkerTempCoordinate.map((coordinate) => coordinate.toFixed(5)).join(', ');
    // console.log(`mainMarkerCoordinate: ${mainMarkerCoordinate}`);
    addressField.value = mainMarkerCoordinate;
  });

  // Если основная метка не сдвинута, то её координаты равны координатам центра города
  // рабочий вариант без очистки формы
  // resetMainMarker();


  // if (!mainMarkerCoordinate) {
  //   addressField.value = Object.values(cityCenter).join(', ');
  // }
  if (!mainMarkerCoordinate) {
    resetMainMarker();
  }
  // resetMainMarker();
};

// const ads = getSimilarAds();

const renderMarkers = (ads) => {
  const icon = L.icon({
    iconUrl: iconConfig.url,
    iconSize: [iconConfig.width, iconConfig.height],
    iconAnchor: [iconConfig.anchorX, iconConfig.anchorY]
  });
  // const renderMarkers = (data) => {
  // временно первые 5 объявлений
  // const ads = data.slice(0, 5);
  // console.log (ads);
  ads.forEach(({author, location, offer}) => {
    const lat = (location.lat).toFixed(5);
    const lng = (location.lng).toFixed(5);
    const marker = L.marker(
      {
        lat,
        lng
      },
      {
        icon
      }
    );
    marker.addTo(map).bindPopup(renderAd({author, offer}));
  });
};

export {renderMap, renderMainMarker, renderMarkers, resetMainMarker};
