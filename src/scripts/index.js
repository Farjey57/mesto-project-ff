// мне совсем не нравится, но это работает
import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, onLike} from './card.js';
import {openPopup, closePopup} from './modal.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

/* Модалки */

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

/* Поля для работы с editPopup */

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

/* Формы */

const formEdit = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

/* Поля форм */

const nameFormEdit = formEdit.elements.name;
const descriptionFormEdit = formEdit.elements.description;

/* Обработчики открытия и submit модалки editPopup */

editButton.addEventListener('click', () => {
  nameFormEdit.value = profileTitle.textContent;
  descriptionFormEdit.value = profileDescription.textContent;

  openPopup(editPopup);
});

function handleformEditSubmit(evt) {
  evt.preventDefault();

  profileTitle.textContent = nameFormEdit.value;
  profileDescription.textContent = descriptionFormEdit.value;
  closePopup(editPopup);
}

formEdit.addEventListener('submit', handleformEditSubmit);

/* Обработчики открытия и submit модалки newCardPopup */

profileAddButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const name = formNewCard.elements['place-name'].value;
  const link = formNewCard.elements['link'].value;
  const data = {
    name,
    link
  };
  placesList.prepend(createCard(data, deleteCard, onLike));
  formNewCard.reset();
  closePopup(newCardPopup);
};

formNewCard.addEventListener('submit', handleNewCardSubmit);

/* Обработчик модалки imagePopup */

function showCard(evt) { 
  const clickItem = evt.target;
  if (clickItem.classList.contains('card__image')) {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = clickItem.src;
    popupImage.alt = clickItem.alt;
    popupCaption.textContent = clickItem.offsetParent.querySelector('.card__title').textContent;
    openPopup(imagePopup);
  }
}

placesList.addEventListener('click', showCard)

/* Формирование контента страницы */

function createContent(dataCards, deleteCard, onLike) {
  dataCards.forEach(element => {
      placesList.append(createCard(element, deleteCard, onLike));
  });
};

createContent(initialCards, deleteCard, onLike);

