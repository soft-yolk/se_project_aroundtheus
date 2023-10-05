import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this.handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  //collects data from all the input fields and returns that data as an object
  _getInputValues() {
    const inputs = this._popupElement.querySelectorAll(".modal__input");
    const data = {};
    inputs.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  // _getInputValues() {
  //   const inputs = this._popupForm.querySelectorAll(".modal__input");
  //   const data = {};
  //   inputs.forEach((input) => {
  //     data[input.name] = input.value;
  //   });
  //   return data;
  // }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleFormSubmit(this._getInputValues);
      this.close();
    });
  }
}
