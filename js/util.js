// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomFloating = (a, b) => {
//   const lower = Math.min(a, b);
//   const upper = Math.max(a, b);
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return result.toFixed(5);
// };

// const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// export {getRandomInteger, getRandomFloating, getRandomArrayElement};

const ALERT_SHOW_TIME = 5000;
const HOUSING_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель'
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {HOUSING_TYPES, showAlert, isEscapeKey};
