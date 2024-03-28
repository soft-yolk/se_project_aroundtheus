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
    return fetch(this.baseUrl + "/cards", {
      method: "GET",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  //get user info
  getUserInfo() {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  //update profile info PATCH /users/me
  updateProfileInfo(name, about) {
    return fetch(this.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    }).then(this._checkServerResponse);
  }

  //update avatar PATCH /users/me/avatar
  updateAvatar(url) {
    return fetch(this.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar: url }),
    }).then(this._checkServerResponse);
  }

  //CARD ROUTES---------------

  //create a card POST /cards
  addCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._checkServerResponse);
  }

  //delete a card DELETE /cards/:cardId
  deleteCard(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
      body: JSON.stringify({
        _id: cardId,
      }),
    }).then(this._checkServerResponse);
  }

  updateLike(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }

  removeLike(cardId) {
    return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkServerResponse);
  }
  //like a card PUT /cards/:cardId/likes
  // likeCard(cardId, _isLiked) {
  //   return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
  //     method: _isLiked ? "DELETE" : "PUT",
  //     headers: this.headers,
  //   }).then(this._checkServerResponse);
  // }

  // //dislike a card DELETE /cards/:cardId/likes
  // dislikeCard(cardId) {
  //   return fetch(this.baseUrl + `/cards/${cardId}/likes`, {
  //     method: "DELETE",
  //     headers: this.headers,
  //   }).then(this._checkServerResponse);
  // }
}
