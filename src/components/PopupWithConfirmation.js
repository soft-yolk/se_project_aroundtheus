import Popup from "./Popup";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._confirmDelete = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDelete.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }

  setSubmitAction(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
}
