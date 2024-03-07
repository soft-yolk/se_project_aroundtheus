import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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
const profileImage = document.querySelector(".profile__image");
// const deleteButton = document.querySelector(".elements__trash-button");

//Section Render

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  ".elements__cards"
);

//User Info Render

const userInfo = new UserInfo(
  ".profile__name",
  ".profile__description",
  ".profile__image"
);

//API Render
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "fd96ab9c-850a-4647-8171-f92858b5cf89",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then(() => {
    cardsSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData.name, userData.about);
  })
  .catch((err) => {
    console.error(err);
  });

//FUNCTIONS----------------------

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#element-template",
    () => handleImageClick(cardData),
    handleDeleteButton
  );
  return card.getView();
}

function renderCard(cardData) {
  const card = createCard(cardData);
  cardsSection.addItem(card);
}

//Image Popup Render

const imagePopup = new PopupWithImage("#modal-preview");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData.name, cardData.link);
}

// function handleSubmitMessage(
//   request,
//   popupInstance,
//   loadingText = "Saving..."
// ) {
//   popupInstance.renderLoading(true, loadingText);
//   request()
//     .then(() => {
//       popupInstance.close();
//     })
//     // we need to catch possible errors
//     // console.error is used to handle errors if you don’t have any other ways for that
//     .catch(console.error)
//     // in `finally` we need to return the initial button text back in any case
//     .finally(() => {
//       popupInstance.renderLoading(false);
//     });
// }

// function handleProfileEditSubmit({ title, description }) {
//   editProfilePopup.setLoading(true, "Saving ...");
//   api.updateUserInfo({ title, description }).then((res) => {
//     profileUserInfo.setUserInfo(res);
//   });
//   editProfilePopup.close();
// }

// cardsSection.renderItems();

function handleProfileEditSubmit(inputValues) {
  // const userData = editProfilePopup.getInputValues();
  function makeRequest() {
    return api.updateProfileInfo(inputValues).then((userData) => {
      userInfo.setUserInfo(userData);
    });
  }
  // userInfo.setUserInfo();
  editProfilePopup.close();
  handleSubmitMessage(makeRequest, profileEditModal);
}

function handleAddNewCardSubmit(cardData) {
  renderCard(cardData, cardsWrap);
  newCardPopup.close();
}

//Confirm Delete Popup Render

const confirmDelete = new PopupWithConfirmation("#confirm-modal");
// confirmDelete.setEventListeners();

function handleDeleteButton() {
  console.log("Delete button clicked");
  confirmDelete.open();
  //should only open.
  // confirmDelete.handleYesAction(() => {
  //   confirmDelete.setLoading(true);
  //   api
  //     .deleteCard(cardID)
  //     .then(() => {
  //       card.remove();
  //       confirmDelete.close();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       confirmDelete.setLoading(false);
  //     });
  // });
}

const avatarPopup = new PopupWithForm("#profile-picture-modal");
avatarPopup.setEventListeners();

//EVENT LISTENERS----------------------
profileImage.addEventListener("click", () => {
  avatarPopup.open();
});
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.job;
  editProfilePopup.open();
  editFormValidator.resetValidation();
  // userInfo.getUserInfo;
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
