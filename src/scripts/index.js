// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
import '../pages/index.css';

const placesList = document.querySelector('.places__list')

function deleteCard(evt) {
    const cardItem = evt.target.closest('.card');
    cardItem.remove();
};

function createCard (dataCard, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardItem = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardItem.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', deleteCard);
    
    cardItem.querySelector('.card__image').src = dataCard.link;
    cardItem.querySelector('.card__image').alt = dataCard.name;
    cardItem.querySelector('.card__title').textContent = dataCard.name;

    return cardItem;
}

function createContent(dataCards, deleteCard) {
    dataCards.forEach(element => {
        placesList.append(createCard(element, deleteCard));
    });
};

createContent(initialCards, deleteCard)
