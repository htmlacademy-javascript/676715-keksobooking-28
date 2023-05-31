import {isEscapeKey} from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessage.querySelector('.error__button');

const closeSuccessMessage = () => successMessage.remove();
const closeErrorMessage = () => errorMessage.remove();
const onErrorButtonClick = () => closeErrorMessage();

const onSuccessClickOutside = (evt) => {
  const isEvent = evt.target.closest('.success');
  if (isEvent) {
    closeSuccessMessage();
    document.removeEventListener('click', onSuccessClickOutside);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const onErrorClickOutside = (evt) => {
  const isEvent = evt.target.closest('.error');
  if (isEvent) {
    closeErrorMessage();
    document.removeEventListener('click', onErrorClickOutside);
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const openSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onSuccessClickOutside);
};

const openErrorMessage = () => {
  document.body.append(errorMessage);
  errorButton.addEventListener('click', onErrorButtonClick);
  document.addEventListener('click', onErrorClickOutside);
  document.addEventListener('keydown', onDocumentKeydown);
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
