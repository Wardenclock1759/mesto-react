import {
    token,
    cohort
} from "./constants";

class Api {
    constructor(options) {
        this._options = options;
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        }
        else {
            return Promise.reject(`Ошибка: ${response.status}`);
        }
    }

    getInitialCards() {
        return fetch(this._options.baseURL+"/cards", this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    addCard(cardData) {
        this._options.body = JSON.stringify(cardData);
        this._options.method = "POST";
        return fetch(this._options.baseURL+"/cards", this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    deleteCard(id) {
        this._options.method = "DELETE";
        return fetch(this._options.baseURL+`/cards/${id}`, this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    getProfileInfo() {
        return fetch(this._options.baseURL+"/users/me", this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    setProfileInfo(userInfo) {
        this._options.body = JSON.stringify(userInfo);
        this._options.method = "PATCH";
        return fetch(this._options.baseURL+"/users/me", this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    updateAvatar(data) {
        this._options.body = JSON.stringify(data);
        this._options.method = "PATCH";
        return fetch(this._options.baseURL+"/users/me/avatar", this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    likeCard(id) {
        this._options.method = "PUT";
        return fetch(this._options.baseURL+`/cards/${id}/likes`, this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    unlikeCard(id) {
        this._options.method = "DELETE";
        return fetch(this._options.baseURL+`/cards/${id}/likes`, this._options)
        .then(res => {
            return this._handleResponse(res);
        });
    }

    changeLikeCardStatus(id, like) {
        if (like) {
            return this.likeCard(id);
        } else {
            return this.unlikeCard(id);
        }
    }
}

const api = new Api({
    baseURL: `https://mesto.nomoreparties.co/v1/${cohort}`,
    mode: "cors",
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
});

export default api;