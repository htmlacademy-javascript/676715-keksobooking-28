import {addressField} from './form.js';
import {renderAd} from './ads.js';
import {debounce} from './util.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 13;
const MARKERS_COUNT = 10;
const HOUSING_NOT_FOR_GUESTS = 100;
const RERENDER_DELAY = 500;

const mainIconConfig = {
  url: '../img/main-pin.svg',
  width: 52,
  height: 52,
  anchorX: 26,
  anchorY: 52
};
const simpleIconConfig = {
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
const priceFilterValue = {
  low: {
    min: 0,
    max: 9999
  },
  middle: {
    min: 10000,
    max: 50000
  },
  high: {
    min: 50001,
    max: Infinity
  }
};

const mapFilter = document.querySelector('.map__filters');
const housingFilterItem = mapFilter.querySelector('[name="housing-type"]');
const priceFilterItem = mapFilter.querySelector('[name="housing-price"]');
const roomsFilterItem = mapFilter.querySelector('[name="housing-rooms"]');
const guestsFilterItem = mapFilter.querySelector('[name="housing-guests"]');
const featuresFilterItems = mapFilter.querySelectorAll('[name="features"]');

let mainMarker;
let mainMarkerTempCoordinate;
let mainMarkerCoordinate;
let map;
let markerGroup;
let defaultMarkers;
let filteredMarkers;

const renderMap = () => {
  map = L.map('map-canvas').setView(cityCenter, ZOOM);
  L.tileLayer(TILE_LAYER, {attribution: COPYRIGHT}).addTo(map);
};

const resetMainMarker = () => {
  map.setView(cityCenter, ZOOM);
  mainMarker.setLatLng(cityCenter);
  addressField.value = Object.values(cityCenter).join(', ');
};

const getIconConfig = (iconConfig) => ({
  iconUrl: iconConfig.url,
  iconSize: [iconConfig.width, iconConfig.height],
  iconAnchor: [iconConfig.anchorX, iconConfig.anchorY]
});

const renderMainMarker = () => {
  const mainIcon = L.icon(getIconConfig(mainIconConfig));

  mainMarker = L.marker(cityCenter, {
    draggable: true,
    icon: mainIcon
  });

  mainMarker.addTo(map);
  mainMarker.on('moveend', (evt) => {
    mainMarkerTempCoordinate = Object.values(evt.target.getLatLng());
    mainMarkerCoordinate = mainMarkerTempCoordinate.map((coordinate) => coordinate.toFixed(5)).join(', ');
    addressField.value = mainMarkerCoordinate;
  });

  if (!mainMarkerCoordinate) {
    resetMainMarker();
  }
};

const renderMarkers = ({author, location, offer}) => {
  const simpleIcon = L.icon(getIconConfig(simpleIconConfig));
  const lat = (location.lat).toFixed(5);
  const lng = (location.lng).toFixed(5);
  const marker = L.marker(
    {
      lat,
      lng
    },
    {
      simpleIcon
    }
  );
  marker.addTo(markerGroup).bindPopup(renderAd({author, offer}));
};

const createMarkers = (data) => {
  markerGroup = L.layerGroup().addTo(map);
  const ads = data.slice(0, MARKERS_COUNT);
  ads.forEach((marker) => renderMarkers(marker));
};

// Фильтрация меток
const getFilteredMarkers = () => {
  if (housingFilterItem.value !== 'any') {
    filteredMarkers = filteredMarkers.filter((marker) => marker.offer.type === housingFilterItem.value);
  }
  if (priceFilterItem.value !== 'any') {
    const minPrice = priceFilterValue[priceFilterItem.value].min;
    const maxPrice = priceFilterValue[priceFilterItem.value].max;
    filteredMarkers = filteredMarkers.filter((marker) => marker.offer.price >= minPrice && marker.offer.price <= maxPrice);
  }
  if (roomsFilterItem.value !== 'any') {
    filteredMarkers = filteredMarkers.filter((marker) => marker.offer.rooms === Number(roomsFilterItem.value));
  }
  if ((guestsFilterItem.value !== 'any') && (guestsFilterItem.value !== Number('0'))) {
    filteredMarkers = filteredMarkers.filter((marker) => marker.offer.guests === Number(guestsFilterItem.value));
  } else if (guestsFilterItem.value === Number('0')) {
    filteredMarkers = filteredMarkers.filter((marker) => marker.offer.guests === HOUSING_NOT_FOR_GUESTS);
  }
  featuresFilterItems.forEach((featuresFilterItem) => {
    if (featuresFilterItem.checked) {
      filteredMarkers = filteredMarkers.filter((marker) => {
        const featureArrayValues = marker.offer.features;
        if (featureArrayValues) {
          return featureArrayValues.includes(featuresFilterItem.value);
        } else {
          return false;
        }
      });
    }
  });
  markerGroup.clearLayers();
  createMarkers(filteredMarkers);
};

const debounceFilter = debounce(getFilteredMarkers, RERENDER_DELAY);

const printFilteredMarkers = (points) => {
  mapFilter.addEventListener('change', () => {
    defaultMarkers = points;
    filteredMarkers = points;
    debounceFilter();
  });
};

const resetMarkersPopup = () => {
  map.closePopup();
};

const resetFilter = () => {
  mapFilter.reset();
  filteredMarkers = defaultMarkers;
  getFilteredMarkers();
};

export {renderMap, renderMainMarker, createMarkers, printFilteredMarkers, resetMainMarker, resetMarkersPopup, resetFilter};
