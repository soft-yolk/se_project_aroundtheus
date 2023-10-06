import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import { initialCards, config } from "../utils/constants.js";

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

function createCard(cardData) {
  const card = new Card(cardData, "#element-template", () =>
    handleImageClick(cardData)
  );
  return card.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  cardsSection.addItem(card);
}

function handleImageClick(cardData) {
  imagePopup.open(cardData.name, cardData.link);
}

cardsSection.renderItems();

//User Info Render

const userInfo = new UserInfo(".profile__name", ".profile__description");

function handleProfileEditSubmit() {
  const userData = editProfilePopup.getInputValues();
  userInfo.setUserInfo(userData);
  editProfilePopup.close();
}

function handleAddNewCardSubmit(cardData) {
  renderCard(cardData, cardsWrap);
  newCardPopup.close();
}

//EVENT LISTENERS----------------------
profileEditButton.addEventListener("click", () => {
  editProfilePopup.open();
  editFormValidator.resetValidation();
  userInfo.getUserInfo;
});

addNewCardButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  newCardPopup.open();
});

//RENDER--------------------------

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
