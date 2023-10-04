import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
// import { closeByEscape, closePopup, openPopup } from "../utils/utils.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

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
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardTitleInput = addCardForm.querySelector("#title-modal-input");
const addCardUrlInput = addCardForm.querySelector("#image-url-modal-input");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#name-modal-input");
const profileDescriptionInput = document.querySelector(
  "#description-modal-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const previewImageModalWindow = document.querySelector("#modal-preview");

//Section Render

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements__cards"
);

//FUNCTIONS----------------------

function renderCard(cardData) {
  const card = new Card(cardData, "#element-template");
  cardsSection.addItem(card.getView());
}

cardsSection.renderItems();

function handleProfileEditSubmit(event) {
  // event.preventDefault();
  userInfo.setUserInfo(data);
  newCardPopup.close();
  // closePopup(profileEditModal);
}

function handleAddNewCardSubmit(event) {
  // event.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardUrlInput.value;
  addCardForm.reset();
  renderCard({ name, link }, cardsWrap);
  newCardPopup.close();
  // closePopup(addCardModal);
}

//EVENT LISTENERS----------------------
profileEditButton.addEventListener("click", () => {
  newCardPopup.open();
  // openPopup(profileEditModal);
  editFormValidator.resetValidation();
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", handleAddNewCardSubmit);

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
  // openPopup(addCardModal);
});

// [profileEditModal, addCardModal, previewImageModalWindow].forEach((modal) => {
//   modal.addEventListener("mousedown", (event) => {
//     if (
//       event.target.classList.contains("modal") ||
//       event.target.classList.contains("modal__close")
//     ) {
//       closePopup(modal);
//     }
//   });
// });

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

//New Card Popup Render

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddNewCardSubmit
);
newCardPopup.setEventListeners();

//Edit Profile Popup Render

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

//Image Popup Render

const imagePopup = new PopupWithImage("#modal-preview");
imagePopup.setEventListeners();

//User Info Render

const userInfo = new UserInfo(".profile__name", ".profile__description");
