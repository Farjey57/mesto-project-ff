import {openPopup} from './modal.js';

function deleteCard(evt) {
  const cardItem = evt.target.closest('.card');
  cardItem.remove();
};

function onLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

function showCard(evt) {
  const imagePopup = document.querySelector('.popup_type_image');
  imagePopup.querySelector('.popup__image').src = evt.target.src;
  imagePopup.querySelector('.popup__image').alt = evt.target.alt;
  imagePopup.querySelector('.popup__caption').textContent = evt.target.offsetParent.querySelector('.card__title').textContent;
  openPopup(imagePopup)
}

function createCard(dataCard, deleteCard, onLike, showCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');
  const cardImage = cardItem.querySelector('.card__image');

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', onLike);
  cardImage.addEventListener('click', showCard);
  
  cardItem.querySelector('.card__image').src = dataCard.link;
  cardItem.querySelector('.card__image').alt = dataCard.name;
  cardItem.querySelector('.card__title').textContent = dataCard.name;

  return cardItem;
};

export {createCard, deleteCard, onLike, showCard}