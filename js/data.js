import {getRandomInteger, getRandomFloating, getRandomArrayElement} from './util.js';

const ADS_COUNT = 10;
// const ADS_COUNT = 1;
const AVATAR_COUNT = 10;
const HOUSING_LAT_MIN = 35.65000;
const HOUSING_LAT_MAX = 35.70000;
const HOUSING_LNG_MIN = 139.70000;
const HOUSING_LNG_MAX = 139.80000;
const ADS_TITLES = [
  'Вы этого достойны!',
  'Все удобства для вас',
  'Жилье со всеми удобствами',
  'Комфортное жилье',
  'Комфортное жилье за небольшие деньги',
  'Прекрасное место для прекрасных людей',
  'Жилье в шаговой доступности',
  'Жилье в шаговой доступности от центра города',
  'Вы останетесь довольны проживанием у нас',
  'Райское место'
];
const ADS_DESCRIPTIONS = [
  'Все условия для комфортного проживания',
  'Наличие всех удобств для комфортного проживания',
  'Допускается размещение с маленькими детьми и животными',
  'Открывается прекрасный вид с балкона',
  'Шикарный вид из окна на историческую часть города',
  'Прекрасный вид из окна',
  'В шаговой доступности ТЦ, аптеки, кафе, рестораны, заправки',
  'Всего 10 минут от центра города',
  'Находится в престижном районе города',
  'Находится в исторической части города'
];
const HOUSING_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};
const HOUSING_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const HOUSING_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const CHECKIN_CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const getAvatar = () => {
  const array = [];
  for (let i = 1; i <= AVATAR_COUNT; i++) {
    const avatarId = (i < AVATAR_COUNT) ? `0${i}` : i;
    array[i - 1] = `img/avatars/user${avatarId}.png`;
  }
  return array;
};

const getLocation = () => ({
  lat: getRandomFloating(HOUSING_LAT_MIN, HOUSING_LAT_MAX),
  lng: getRandomFloating(HOUSING_LNG_MIN, HOUSING_LNG_MAX),
});

const createArray = (dates) => Array.from({length: getRandomInteger(1, dates.length)}, () => getRandomArrayElement(dates));

const leaveUniqueElements = (array) => array.filter((item, i) => i === array.indexOf(item));

const createSimilarAd = () => {
  const location = getLocation();
  const ad = {
    author:{
      avatar: getRandomArrayElement(getAvatar())
    },
    location,
    offer:{
      title: getRandomArrayElement(ADS_TITLES),
      address: Object.values(location).join(', '),
      price: getRandomInteger(100, 1000),
      type: getRandomArrayElement(Object.keys(HOUSING_TYPES)),
      rooms: getRandomInteger(1, 10),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
      checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
      features: leaveUniqueElements(createArray(HOUSING_FEATURES)),
      description: getRandomArrayElement(ADS_DESCRIPTIONS),
      photos: leaveUniqueElements(createArray(HOUSING_PHOTOS))
    }
  };
  return ad;
};

const getSimilarAds = () => Array.from({length: ADS_COUNT}, (_, index) => createSimilarAd(index + 1));

export {HOUSING_TYPES, getSimilarAds};
