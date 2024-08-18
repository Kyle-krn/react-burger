const API_URL = 'https://norma.nomoreparties.space'

export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const request = (url, options) => {
    // принимает два аргумента: урл и объект опций, как и `fetch`
    return fetch(API_URL + url, options).then(checkResponse)
  }