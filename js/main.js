import {getRandomInteger, getRandomFloating, getRandomArrayElement} from './util.js';

const AVATAR_COUNT = 10;
const HOUSING_LAT_MIN = 35.65000;
const HOUSING_LAT_MAX = 35.70000;
const HOUSING_LNG_MIN = 139.70000;
const HOUSING_LNG_MAX = 139.80000;
const ADS_COUNT = 10;
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
const HOUSING_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
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

const createArray = (dates, arrayLength) => Array.from({length: getRandomInteger(1, arrayLength)}, () => getRandomArrayElement(dates));

// Похожее объявление:
const createSimilarAd = () => ({
  // автор
  // аватар: массив адресов картинок аватаров вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
  author:{
    avatar: getRandomArrayElement(getAvatar())
  },

  // местоположение в виде географических координат. Состоит из двух полей:
  // lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
  // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
  location:{
    lat: getRandomFloating(HOUSING_LAT_MIN, HOUSING_LAT_MAX),
    lng: getRandomFloating(HOUSING_LNG_MIN, HOUSING_LNG_MAX),
  },
  // объявление
  // title, строка — заголовок предложения. Придумайте самостоятельно.
  // price, число — стоимость. Случайное целое положительное число.
  // type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
  // rooms, число — количество комнат. Случайное целое положительное число.
  // guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
  // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
  // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
  // description, строка — описание помещения. Придумайте самостоятельно.
  // photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

  offer:{
    title: getRandomArrayElement(ADS_TITLES),
  // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат как в объекте location (см. ниже) {{lat}}, {{lng}}.
    // address: String(this.location.lat, this.location.lng),`
    // address: `${location.lat}, ${location.lng}`,
    address: location.lat,
    price: getRandomInteger(1, 100),
    type: getRandomArrayElement(HOUSING_TYPES),
    rooms: getRandomInteger(1, 7),
    guests: getRandomInteger(1, 10),
    checkin: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    checkout: getRandomArrayElement(CHECKIN_CHECKOUT_TIME),
    features: createArray(HOUSING_FEATURES, HOUSING_FEATURES.length),
    description: getRandomArrayElement(ADS_DESCRIPTIONS),
    photos: createArray(HOUSING_PHOTOS, HOUSING_PHOTOS.length)
  }

});

const getSimilarAds = () => Array.from({length: ADS_COUNT}, (_, index) => createSimilarAd(index + 1));

console.log(getSimilarAds());
