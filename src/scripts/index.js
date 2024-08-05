import '../pages/index.css';
import { getInitialCards, getUserData, patchUserData, postNewCard, patchAvatr } from './api.js';
import {createCard, deleteCard, onLike} from './card.js';
import {openPopup, closePopup} from './modal.js';
import {enableValidation, clearValidation} from './validation.js';

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const OPTIONS = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

/* Модалки */

const editPopup = document.querySelector('.popup_type_edit');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

/* Поля для работы с editPopup */

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

/* Формы */

const formEditAvatar = document.forms['edit-avatar'];
const formEdit = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];

/* Поля форм */

const nameFormEdit = formEdit.elements.name;
const descriptionFormEdit = formEdit.elements.description;
const avatarUrl = formEditAvatar.elements.link;
console.log(avatarUrl)

function renderLoading (isLoading, element) {
  if (isLoading) {
    element.textContent = 'Сохранение...';
  } else {
    element.textContent = 'Сохранить';
  };
}

/* Обработчики открытия и submit модалки editPopup */

editButton.addEventListener('click', () => {
  nameFormEdit.value = profileTitle.textContent;
  descriptionFormEdit.value = profileDescription.textContent;

  clearValidation(formEdit, OPTIONS);
  openPopup(editPopup);
});

function handleformEditSubmit(evt) {
  evt.preventDefault();

  const popupButon = evt.target.querySelector('.popup__button');
  renderLoading(true, popupButon);

  const name = nameFormEdit.value;
  const about = descriptionFormEdit.value;
  
  patchUserData(name, about)
  .then(() => {
    profileTitle.textContent = name;
    profileDescription.textContent = about;
    closePopup(editPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupButon)
  });
}

formEdit.addEventListener('submit', handleformEditSubmit);

/* Обработчики открытия и submit модалки editAvatarPopup */

profileAvatar.addEventListener('click', () => {
  openPopup(editAvatarPopup);
})

function handleformEditAvatarSubmit(evt) {
  evt.preventDefault();

  const popupButon = evt.target.querySelector('.popup__button');
  renderLoading(true, popupButon);

  patchAvatr(avatarUrl.value)
  .then((res) => {
    profileAvatar.style['background-image'] = `url(${res.avatar})`;
    formEditAvatar.reset();
    clearValidation(formEditAvatar, OPTIONS);
    closePopup(editAvatarPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupButon)
  });
}

formEditAvatar.addEventListener('submit', handleformEditAvatarSubmit);


/* Обработчики открытия и submit модалки newCardPopup */

profileAddButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const popupButon = evt.target.querySelector('.popup__button');
  renderLoading(true, popupButon);

  const name = formNewCard.elements['place-name'].value;
  const link = formNewCard.elements['link'].value;
  
  postNewCard(name, link)
  .then((res) => {
    placesList.prepend(createCard(res, deleteCard, onLike, res.owner._id));
    formNewCard.reset();
    closePopup(newCardPopup);
    clearValidation(formNewCard, OPTIONS);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    renderLoading(false, popupButon)
  });
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

function createContent(dataCards, deleteCard, onLike, userId) {
  dataCards.forEach(element => {
      placesList.append(createCard(element, deleteCard, onLike, userId));
  });
};

Promise.all([getInitialCards(), getUserData()])
.then((res) => {
  const userId = res[1]._id;
  createContent(res[0], deleteCard, onLike, userId);

  profileTitle.textContent = res[1].name;
  profileDescription.textContent = res[1].about;
  profileAvatar.style['background-image'] = `url(${res[1].avatar})`;
})
.catch((err) => {
  console.log(err);
});

enableValidation(OPTIONS);
