import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitButton = this._popupForm.querySelector(".modal__button");
    this._submitButtonText = this._submitButton.textContent;
    this.handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  //collects data from all the input fields and returns that data as an object
  getInputValues() {
    const inputs = this._popupElement.querySelectorAll(".modal__input");
    const data = {};
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmit(this.getInputValues());
      this.close();
    });
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
