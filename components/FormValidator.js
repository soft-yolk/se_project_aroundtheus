export default class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._formEl = formEl;
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _checkFormValidity() {
    return this._inputList.every((input) => input.validity.valid);
  }

  _toggleButtonState() {
    // let foundInvalid = false;
    // inputEl.forEach((inputEl) => {
    //   if (!inputEl.validity.valid) {
    //     foundInvalid = true;
    //   }
    // });

    const foundInvalid = this._checkFormValidity();

    if (foundInvalid) {
      this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = false;
    } else {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
    }
  }
  // if (foundInvalid) {
  //   this._submitButtonSelector.classList.add(this._inactiveButtonClass);
  //   this._submitButtonSelector.disabled = true;
  // } else {
  //   this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
  //   this._submitButtonSelector.disabled = false;
  // }
  // }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (event) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._setEventListeners();
  }
}
