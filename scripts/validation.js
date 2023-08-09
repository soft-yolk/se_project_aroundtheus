//SPACE

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessageEl);
  inputEl.classlist.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classlist.add(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
}
function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  inputEls.forEach((inputEls) => {
    inputEls.addEventListener("input", (event) => {
      checkInputValidity(formEl, inputEls, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    setEventListeners(formEl, options);
    //look for all inputs inside of form
    //loop through all the inputs to see if all are valid
    //if input is not valid
    //get validation message
    //add error class to input (thats going to make it red)
    //display error message
    //disable button
    //if all inputs are valid
    //enable button
    //reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
