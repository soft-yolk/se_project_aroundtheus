import { openPopup } from "../utils/utils.js";

export default class Card {
  constructor({ name, link }, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".elements__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".elements__trash-button")
      .addEventListener("click", () => {
        this._handleTrashCard();
      });

    this._cardElement
      .querySelector(".elements__image")
      .addEventListener("click", () => {
        this._handleOpenPreview();
      });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".elements__like-button")
      .classList.toggle("elements__like-button_active");
  }

  _handleTrashCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleOpenPreview() {
    this._previewImageModalWindow = document.querySelector("#modal-preview");
    this._previewImageModal = document.querySelector("#preview-image-modal");
    this._previewTitle = document.querySelector(".modal__title");
    this._previewImageModal.src = this._link;
    this._previewImageModal.alt = this._name;
    this._previewTitle.textContent = this._name;
    openPopup(this._previewImageModalWindow);
  }

  getView() {
    this._cardElement = this._getTemplate();
    this._renderCard();
    this._setEventListeners();
    return this._cardElement;
  }

  _renderCard() {
    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._cardTitle = this._cardElement.querySelector(".elements__title");

    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
  }
}
