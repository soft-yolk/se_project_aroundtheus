import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { closeByEscape, closePopup, openPopup } from "../utils/utils.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//SELECTORS----------------------
const cardsWrap = document.querySelector(".elements__cards");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
// const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const addCardForm = addCardModal.querySelector(".modal__form");

const addCardTitleInput = addCardForm.querySelector("#title-modal-input");
const addCardUrlInput = addCardForm.querySelector("#image-url-modal-input");

const profileEditModal = document.querySelector("#profile-edit-modal");
// const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#name-modal-input");
const profileDescriptionInput = document.querySelector(
  "#description-modal-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");

// const elementTemplate =
//   document.querySelector("#element-template").content.firstElementChild;
// const elementCardList = document.querySelector(".elements__cards");
const previewImageModalWindow = document.querySelector("#modal-preview");
// const previewImageModal = document.querySelector("#preview-image-modal");
// const previewTitle = document.querySelector(".modal__title");
// const previewCloseButton =
//   previewImageModalWindow.querySelector(".modal__close");
// const modal = document.querySelector(".modal");

//FUNCTIONS----------------------

function renderCard(cardData, wrapper) {
  const card = new Card(cardData, "#element-template");
  wrapper.prepend(card.getView());
}

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddNewCardSubmit(event) {
  event.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  addCardForm.reset();
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
}

//EVENT LISTENERS----------------------
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddNewCardSubmit);

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

[profileEditModal, addCardModal, previewImageModalWindow].forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (
      event.target.classList.contains("modal") ||
      event.target.classList.contains("modal__close")
    ) {
      closePopup(modal);
    }
  });
});

//RENDER--------------------------
initialCards.forEach((elementData) => renderCard(elementData, cardsWrap));

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();
