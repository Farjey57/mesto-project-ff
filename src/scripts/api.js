const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-17',
  headers: {
    authorization: '60ea0cbc-ecac-4fab-8ccd-45bcbcab753c',
    'Content-Type': 'application/json'
  }
}

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkStatus);
} 

const getUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkStatus);
}

const patchUserData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      'name': name,
      'about': about
    })
  })
  .then(checkStatus);
}

const postNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      'name': name,
      'link': link
    })
  })
  .then(checkStatus);
}

const deleteCardServer = (_id) => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkStatus);
}

const putLikeCard = (_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkStatus);
}

const deleteLikeCard = (_id) => {
  return fetch(`${config.baseUrl}/cards/likes/${_id}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkStatus);
}

const patchAvatr = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(checkStatus);
}

export { getInitialCards, getUserData, patchUserData, postNewCard, deleteCardServer, putLikeCard, deleteLikeCard, patchAvatr }