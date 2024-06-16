import {keyHandler} from './utils.js';

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopup);
  document.addEventListener('keydown', closePopup);
}

function closePopup(evt) {
  if(evt.target.classList.contains('popup') ||
  evt.target.classList.contains('popup__close')) {
    clearModal(evt.target.closest('.popup'))
  }
  if(keyHandler(evt.key, 'Escape')) {
    clearModal(document.querySelector('.popup_is-opened'));
  }
}

function clearModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopup);
  document.removeEventListener('keydown', closePopup);
}

export {openPopup, closePopup, clearModal}