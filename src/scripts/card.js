import { deleteCardServer, putLikeCard, deleteLikeCard } from './api.js';

function deleteCard(evt) {
  const cardItem = evt.target.closest('.card');
  deleteCardServer(cardItem.id)
  cardItem.remove();
};

function onLike(evt) {
  const element = evt.target;
  const card = element.closest('.card');
  const likeConter = card.querySelector('.card__like-conter');
  
  if (element.classList.value.includes('card__like-button_is-active')) {
    deleteLikeCard(card.id)
    .then((res) => {
      likeConter.textContent = res.likes.length;
    })
    element.classList.remove('card__like-button_is-active');
  } else {
    putLikeCard(card.id)
    .then((res) => {
      likeConter.textContent = res.likes.length;
    });
    element.classList.add('card__like-button_is-active');
  }
}

function createCard(dataCard, deleteCard, onLike, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardItem.querySelector('.card__delete-button');
  const likeButton = cardItem.querySelector('.card__like-button');

  /* Удаляем кнопку корзины для карточек других пользователей */
  if (dataCard.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', deleteCard);
  }

  /* Ставим лайк при создании карточки, если мы когда-то лайкали эту карточку */
  dataCard.likes.forEach(liked => {
    if (liked._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  likeButton.addEventListener('click', onLike);
  
  cardItem.id = dataCard._id;
  cardItem.querySelector('.card__image').src = dataCard.link;
  cardItem.querySelector('.card__image').alt = dataCard.name;
  cardItem.querySelector('.card__title').textContent = dataCard.name;
  cardItem.querySelector('.card__like-conter').textContent = dataCard.likes.length;

  return cardItem;
};

export {createCard, deleteCard, onLike}