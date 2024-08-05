import { deleteCardServer, putLikeCard, deleteLikeCard } from './api.js';

function deleteCard(cardItem) {
  deleteCardServer(cardItem.id)
  cardItem.remove();
};

function onLike(likeConter, likeButton, dataCard) {
  if (likeButton.classList.value.includes('card__like-button_is-active')) {
    deleteLikeCard(dataCard._id)
    .then((res) => {
      likeConter.textContent = res.likes.length;
      likeButton.classList.remove('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    putLikeCard(dataCard._id)
    .then((res) => {
      likeConter.textContent = res.likes.length;
      likeButton.classList.add('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    });
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
    deleteButton.addEventListener('click', () => {
      deleteCard(cardItem);
    });
  }

  /* Ставим лайк при создании карточки, если мы когда-то лайкали эту карточку */
  dataCard.likes.forEach(liked => {
    if (liked._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  const likeConter = cardItem.querySelector('.card__like-conter');
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title')

  cardItem.id = dataCard._id;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  likeConter.textContent = dataCard.likes.length;

  likeButton.addEventListener('click', () => {
    onLike(likeConter, likeButton, dataCard)
  });

  return cardItem;
};

export {createCard, deleteCard, onLike}