export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  //get user info
  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  //update profile info PATCH /users/me
  updateProfileInfo(name, about) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name: name, about: about }),
    }).then(this._checkServerResponse);
  }

  //update avatar PATCH /users/me/avatar
  updateAvatar(avatar) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({ avatar: avatar }),
      }
    ).then(this._checkServerResponse);
  }

  //CARD ROUTES---------------

  //create a card POST /cards
  createCard({ name, link }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkServerResponse);
  }

  //delete a card DELETE /cards/:cardId
  deleteCard() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/${_id}",
      {
        method: "DELETE",
        headers: this.headers,
      }
    ).then(this._checkServerResponse);
  }

  //like a card PUT /cards/:cardId/likes
  likeCard() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/${_id}/likes",
      {
        method: "PUT",
        headers: this.headers,
      }
    ).then(this._checkServerResponse);
  }

  //dislike a card DELETE /cards/:cardId/likes
  dislikeCard() {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/${_id}/likes",
      {
        method: "DELETE",
        headers: this.headers,
      }
    ).then(this._checkServerResponse);
  }
}
