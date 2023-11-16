import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmDelete = this._popupElement.querySelector(".modal__form");
  }
}
