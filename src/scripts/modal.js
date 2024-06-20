import {keyHandler} from './utils.js';

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closePopupByOverlay);
  document.addEventListener('keydown', closePopupByEsc);
}

function closePopupByOverlay(evt) {
    if (evt.target.classList.contains('popup') || 
    evt.target.classList.contains('popup__close')) { 
    closePopup(evt.target.closest('.popup')) 
  } 
}

function closePopupByEsc(evt) {
  if(keyHandler(evt.key, 'Escape')) { 
    closePopup(document.querySelector('.popup_is-opened')); 
  }
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closePopupByOverlay);
  document.removeEventListener('keydown', closePopupByEsc);
}

export {openPopup, closePopup}