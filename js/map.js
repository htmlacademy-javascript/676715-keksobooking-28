import {addressField} from './form.js';
import {getSimilarAds} from './data.js';
import {renderAd} from './ads.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 7;
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
// const mainMarkerCoordinate = {
//   lat: 35.68950,
//   lng: 139.69171,
// };
let mainMarkerTempCoordinate;
let mainMarkerCoordinate;


// const map = L.map('map-canvas').on('load', () => {
//   console.log('Карта инициализирована');
// }).setView(cityCenter, ZOOM);

const map = L.map('map-canvas').on('load', () => {
  console.log('Карта инициализирована');
}).setView(cityCenter, ZOOM);

L.tileLayer(TILE_LAYER, {attribution: COPYRIGHT}).addTo(map);

const mainIcon = L.icon({
  iconUrl: mainIconConfig.url,
  iconSize: [mainIconConfig.width, mainIconConfig.height],
  iconAnchor: [mainIconConfig.anchorX, mainIconConfig.anchorY]
});

const mainMarker = L.marker(cityCenter, {
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

if (!mainMarkerCoordinate) {
  addressField.value = Object.values(cityCenter).join(', ');
}

const ads = getSimilarAds();
console.log (ads);

const icon = L.icon({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY]
});

// const markerGroup = L.layerGroup().addTo(map).bindPopup(offer.title);

// Шаг 26
// const createMarker = (point) => {
//   const {lat, lng} = point;
//   const marker = L.marker(
//     {
//       lat,
//       lng
//     },
//     {
//       icon
//     }
//   );
//   marker.addTo(markerGroup);
// };

// a.forEach((point) => {
//   createMarker(point);
// });


// const createMarker = (point) => {
//   const {lat, lng} = point;
//   const marker = L.marker(
//     {
//       lat,
//       lng
//     },
//     {
//       icon
//     }
//   );
//   marker.addTo(markerGroup);
// };

// отображение меток - рабочий вариант
// ads.forEach(({location, offer}) => {
//   const lat = location.lat;
//   const lng = location.lng;
//   const title = offer.title;
//   const marker = L.marker(
//     {
//       lat,
//       lng
//     },
//     {
//       icon
//     }
//   );
//   marker.addTo(map).bindPopup(title);
// });


ads.forEach(({author, location, offer}) => {
  const lat = location.lat;
  const lng = location.lng;
  // const ad = {lat, lng};
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
