// import {HOUSING_TYPES, showAlert} from './util.js';
// import {sendData} from './api.js';
import {HOUSING_TYPES} from './util.js';
// import {resetMainMarker, renderMainMarker} from './map.js';
import {resetMainMarker} from './map.js';

const ROOM_ERROR_TEXT = 'Размещение невозможно';

const mapFilter = document.querySelector('.map__filters');
const childrenMapFilter = mapFilter.children;
const adForm = document.querySelector('.ad-form');
const childrenAdForm = adForm.children;
const addressField = adForm.querySelector('#address');
const housingTypeField = adForm.querySelector('[name="type"]');
const priceField = adForm.querySelector('#price');
const sliderElement = adForm.querySelector('.ad-form__slider');
const roomNumberField = adForm.querySelector('[name="rooms"]');
const capacityField = adForm.querySelector('[name="capacity"]');
const checkinField = adForm.querySelector('[name="timein"]');
const checkoutField = adForm.querySelector('[name="timeout"]');
const submitButton = adForm.querySelector('.ad-form__submit');
const resetButton = adForm.querySelector('.ad-form__reset');

const roomOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
const priceOption = {
  'Бунгало': 0,
  'Квартира': 1000,
  'Отель': 3000,
  'Дом': 5000,
  'Дворец': 10000
};
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Опубликовываю...'
};

const disableMapFilter = () => {
  mapFilter.classList.add('ad-form--disabled');
  for (let i = 0; i < childrenMapFilter.length; i++) {
    childrenMapFilter[i].disabled = true;
  }
};

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < childrenAdForm.length; i++) {
    childrenAdForm[i].disabled = true;
  }
};

const activateMapFilter = () => {
  mapFilter.classList.remove('ad-form--disabled');
  for (let i = 0; i < childrenMapFilter.length; i++) {
    childrenMapFilter[i].disabled = false;
  }
};

const activateAdForm = () => {
  adForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < childrenAdForm.length; i++) {
    childrenAdForm[i].disabled = false;
  }
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'text-help'
});

// Валидация типа жилья

const validateRoom = () => roomOption[Number(roomNumberField.value)].includes(capacityField.value);

pristine.addValidator(capacityField, validateRoom, ROOM_ERROR_TEXT);

housingTypeField.onchange = function () {
  priceField.placeholder = priceOption[HOUSING_TYPES[housingTypeField.value]];
};

// Валидация цены за ночь

const validatePrice = () => {
  if (priceField.value >= priceOption[HOUSING_TYPES[housingTypeField.value]]) {
    return true;
  } else {
    return false;
  }
};

const getPriceMessage = () => `Минимальная цена должна быть ${priceOption[HOUSING_TYPES[housingTypeField.value]]}`;

pristine.addValidator(priceField, validatePrice, getPriceMessage);

// Слайдер цены

priceField.value = 0;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000
  },
  start: 1000,
  step: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

// Валидация времени заезда и выезда

checkinField.onchange = function () {
  checkoutField.value = checkinField.value;
};

checkoutField.onchange = function () {
  checkinField.value = checkoutField.value;
};

// Кнопка отправки формы

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Отправка формы

const setOnFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await onSuccess(new FormData(adForm));
      unblockSubmitButton();
    }
  });
};

const resetForm = () => {
  // debugger;
  adForm.reset();
  resetMainMarker();
};

// resetButton.addEventListener('click', resetForm);
resetButton.addEventListener('click', () => {
  resetForm();
  // debugger;
});

// export {disableMapFilter, disableAdForm, activateMapFilter, activateAdForm, addressField};
// export {disableMapFilter, disableAdForm, activateMapFilter, activateAdForm, addressField, setOnFormSubmit};
export {resetForm, disableMapFilter, disableAdForm, activateMapFilter, activateAdForm, addressField, setOnFormSubmit};
