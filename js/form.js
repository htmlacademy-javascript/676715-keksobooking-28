import {HOUSING_TYPES} from './util.js';
import {resetMainMarker, resetMarkersPopup, resetFilter} from './map.js';

const ROOM_ERROR_TEXT = 'Размещение невозможно';
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const filtersForm = document.querySelector('.map__filters');
const childrenFiltersForm = filtersForm.children;
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
const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewContainer = document.querySelector('.ad-form__photo');
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

const disableFiltersForm = () => {
  filtersForm.classList.add('ad-form--disabled');
  for (let i = 0; i < childrenFiltersForm.length; i++) {
    childrenFiltersForm[i].disabled = true;
  }
};

const disableAdForm = () => {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < childrenAdForm.length; i++) {
    childrenAdForm[i].disabled = true;
  }
};

const activateFiltersForm = () => {
  filtersForm.classList.remove('ad-form--disabled');
  for (let i = 0; i < childrenFiltersForm.length; i++) {
    childrenFiltersForm[i].disabled = false;
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

// можно заменить на стрелочную функцию?
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
  // start: 1000,
  start: 0,
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

const resetPriceSlider = () => {
  sliderElement.noUiSlider.set(0);
  priceField.value = null;
};
priceField.value = null;

// Валидация времени заезда и выезда
checkinField.onchange = function () {
  checkoutField.value = checkinField.value;
};

checkoutField.onchange = function () {
  checkinField.value = checkoutField.value;
};

// Аватарка пользователя
avatarFileChooser.addEventListener('change', () => {
  const file = avatarFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

// Фотография объявления
photoFileChooser.addEventListener('change', () => {
  const file = photoFileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const photoAd = document.createElement('img');
    photoAd.width = 70;
    photoAd.height = 70;
    photoAd.src = URL.createObjectURL(file);
    photoPreviewContainer.appendChild(photoAd);
  }
});

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
  adForm.reset();
  resetPriceSlider();
  pristine.reset();
  resetMainMarker();
  resetFilter();
  resetMarkersPopup();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {resetForm, disableFiltersForm, disableAdForm, activateFiltersForm, activateAdForm, addressField, setOnFormSubmit};
