import {isEscapeKey} from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
// const successButton = successMessage.querySelector('.success__button');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const closeSuccessMessage = () => successMessage.remove();
const closeErrorMessage = () => errorMessage.remove();
// const onSuccessButtonClick = () => closeSuccessMessage();
const onErrorButtonClick = () => closeErrorMessage();

const onSuccessClickOutside = (evt) => {
  // const successMessageInner = successMessage.querySelector('.success__inner');
  if (!successMessage.contains(evt.target)) {
    closeSuccessMessage();
    document.removeEventListener('click', onSuccessClickOutside);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onErrorClickOutside = (evt) => {
  // const errorMessageInner = errorMessage.querySelector('.error__inner');
  if (!errorMessage.contains(evt.target)) {
    closeErrorMessage();
    document.removeEventListener('click', onErrorClickOutside);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openSuccessMessage = () => {
  document.querySelector('body').append(successMessage);
  // successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onSuccessClickOutside);
};

const openErrorMessage = () => {
  document.querySelector('body').append(errorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onErrorClickOutside);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    closeSuccessMessage();
    closeErrorMessage();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onSuccessClickOutside);
    document.removeEventListener('click', onErrorClickOutside);
  }
}

export {openSuccessMessage, openErrorMessage};
