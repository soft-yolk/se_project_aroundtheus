export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteButton,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this.isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteButton = handleDeleteButton;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".elements__card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(
      ".elements__like-button"
    );

    this._likeButton.addEventListener("click", () => {
      this.handleLikeIcon();
    });

    this._cardElement
      .querySelector(".elements__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteButton(this);
      });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImage);
    });
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  // isLiked() {
  //   return this._isLiked;
  // }

  updateLiked() {
    if (this.isLiked) {
      this._likeButton.classList.add("elements__like-button_active");
    } else {
      this._likeButton.classList.remove("elements__like-button_active");
    }
  }

  setLikeStatus(isLiked) {
    this.isLiked = isLiked;
    this.updateLiked();
  }

  // _handleOpenPreview() {
  //   previewImageModal.src = this._link;
  //   previewImageModal.alt = this._name;
  //   previewTitle.textContent = this._name;
  //   openPopup(previewImageModalWindow);
  //   // previewImageModal.classList.add("modal_opened");
  // }

  getView() {
    this._cardElement = this._getTemplate();
    this.renderCard();
    this._setEventListeners();
    this.updateLiked();
    return this._cardElement;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  renderCard() {
    this._cardImage = this._cardElement.querySelector(".elements__image");
    this._cardTitle = this._cardElement.querySelector(".elements__title");
    this._likeButton = this._cardElement.querySelector(
      ".elements__like-button"
    );
    this._cardTitle.textContent = this._name;
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
  }
}
