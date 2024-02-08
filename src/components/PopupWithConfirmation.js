import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._confirmDelete = this._popupElement.querySelector(".modal__form");

    this._submitButton = this._confirmDelete.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  handleYesAction(action) {
    this._handleYesAction = action;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "loading...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDelete.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}
