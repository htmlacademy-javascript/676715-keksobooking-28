// import {getRandomInteger, getRandomArrayElement} from './util.js';

// const SIMILAR_ADS_COUNT = 10;
const AVATAR_COUNT = 10;

const getAvatar = (index) => {
  for (let i = 1; i <= AVATAR_COUNT; i++) {
    const avatarId = (i < AVATAR_COUNT) ? `0${i}` : i;
    const imgPath = `img/avatars/user${avatarId}.png`;
    console.log(i,imgPath);
  }
};

// Похожее объявление:
const createSimilarAd = () => ({
  // автор
  // аватар: массив адресов картинок аватаров вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
  author:{
    avatar: getAvatar(id)
  },

  // объявление
// title, строка — заголовок предложения. Придумайте самостоятельно.
// address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат как в объекте location (см. ниже) {{lat}}, {{lng}}.
// price, число — стоимость. Случайное целое положительное число.
// type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
// rooms, число — количество комнат. Случайное целое положительное число.
// guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
// checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
// checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
// features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
// description, строка — описание помещения. Придумайте самостоятельно.
// photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
  offer:{},

  // местоположение в виде географических координат. Состоит из двух полей:
    // lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
    // lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
  location:{}
});

