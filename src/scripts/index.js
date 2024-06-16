// мне совсем не нравится, но это работает
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, onLike, showCard} from './card.js';
import {openPopup, closePopup, clearModal} from './modal.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

/* Модалки */
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

/* слушатель модалки edit */
editButton.addEventListener('click', () => {
  const formElement = document.forms['edit-profile'];
  const nameForm = formElement.elements.name;
  const descriptionForm = formElement.elements.description;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameForm.value = profileTitle.textContent;
  descriptionForm.value = profileDescription.textContent;
  openPopup(editPopup);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameForm.value;
    profileDescription.textContent = descriptionForm.value;
    clearModal(evt.target.closest('.popup'));
  }

  formElement.addEventListener('submit', handleFormSubmit);
});

profileAddButton.addEventListener('click', () => {
  openPopup(newCardPopup);
  const formElement = document.forms['new-place'];
  formElement.reset()
  formElement.removeEventListener('submit', handleFormSubmit);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    console.log('отправка')
    const name = formElement.elements['place-name'].value;
    const link = formElement.elements['link'].value;
    const data = {
      name,
      link
    }
    
    placesList.prepend(createCard(data, deleteCard, onLike, showCard));
    formElement.reset()
    clearModal(evt.target.closest('.popup'));
    formElement.removeEventListener('submit', handleFormSubmit);
  };

  formElement.addEventListener('submit', handleFormSubmit);
});

function createContent(dataCards, deleteCard, onLike, showCard) {
  dataCards.forEach(element => {
      placesList.append(createCard(element, deleteCard, onLike, showCard));
  });
};

createContent(initialCards, deleteCard, onLike, showCard);

