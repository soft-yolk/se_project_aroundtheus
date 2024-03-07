import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._imageCaption = this._popupElement.querySelector(".modal__title");
  }

  open(name, link) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._imageCaption.textContent = name;
    super.open();
  }
}
