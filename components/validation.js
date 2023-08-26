//SPACE

// function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.add(inputErrorClass);
//   errorMessageEl.textContent = inputEl.validationMessage;
//   errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
//   const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//   inputEl.classList.remove(inputErrorClass);
//   errorMessageEl.textContent = "";
//   errorMessageEl.classList.remove(errorClass);
// }

// function checkInputValidity(formEl, inputEl, options) {
//   if (!inputEl.validity.valid) {
//     showInputError(formEl, inputEl, options);
//   } else {
//     hideInputError(formEl, inputEl, options);
//   }
// }
//disableButton
//enableButton

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;
  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

// function setEventListeners(formEl, options) {
//   const { inputSelector } = options;
//   const inputEls = [...formEl.querySelectorAll(inputSelector)];
//   const submitButton = formEl.querySelector(options.submitButtonSelector);
//   inputEls.forEach((inputEl) => {
//     inputEl.addEventListener("input", (event) => {
//       checkInputValidity(formEl, inputEl, options);
//       toggleButtonState(inputEls, submitButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   const formEls = [...document.querySelectorAll(options.formSelector)];
//   formEls.forEach((formEl) => {
//     formEl.addEventListener("submit", (event) => {
//       event.preventDefault();
//     });
//     setEventListeners(formEl, options);
//   });
// }

// function closeByEscape(event) {
//   const modalOpen = document.querySelector(".modal_opened");
//   if (event.key === "Escape") {
//     closeModal(modalOpen);
//     e.preventDefault();
//   }
// }

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
enableValidation(config);
