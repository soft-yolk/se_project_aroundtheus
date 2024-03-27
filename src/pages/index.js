import FormValidator from "../components/FormValidator.js";
import "./index.css";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

// const cardData = {
//   name: "Yosemite Valley",
//   link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
// };

//SELECTORS----------------------
const cardsWrap = document.querySelector(".elements__cards");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");

const editProfilePictureModal = document.querySelector(
  "#profile-picture-modal"
);
const editProfilePictureForm =
  editProfilePictureModal.querySelector(".modal__form");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileNameInput = document.querySelector("#name-modal-input");
const profileDescriptionInput = document.querySelector(
  "#description-modal-input"
);
const profileImage = document.querySelector(".profile__image");
const profileImageButton = document.querySelector(".profile__icon");
const avatarModal = document.querySelector("#profile-picture-modal");
const avatarModalButton = avatarModal.querySelector(".modal__button");
// const deleteButton = document.querySelector(".elements__trash-button");

//Section Render

// const cardsSection = new Section(
//   {
//     renderer: renderCard,
//   },
//   ".elements__cards"
// );

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
    authorization: "7b855de8-b589-492b-9e1c-b631d0b0f4c2",
    "Content-Type": "application/json",
  },
});

const cardList = new Section(
  {
    renderer: (cardData) => {
      cardList.addItem(createCard(cardData));
    },
  },
  ".elements__cards"
);

api
  .getInitialCards()
  .then((res) => {
    // console.log(">>Initial Cards", cardData);
    cardList.renderItems(res.reverse());
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
  })
  .catch((err) => {
    console.error(err);
  });

//FUNCTIONS----------------------

function setButtonText(button, text) {
  button.textContent = text;
}

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#element-template",
    () => handleImageClick(cardData),
    handleDeleteButton,
    handleCardLike
  );
  return card.getView();
}

// function renderCard(cardData) {
//   const card = createCard(cardData);
//   section.addItem(card);
// }

//Image Popup Render

const imagePopup = new PopupWithImage("#modal-preview");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData.name, cardData.link);
}

function handleCardLike(card) {
  api
    .likeCard(card._id, card.isLiked())
    .then(() => {
      card.handleLikeIcon();
    })
    .catch(console.error);
}

function handleProfileEditSubmit({ name, about }) {
  editProfilePopup.setLoading(true);
  return api
    .updateProfileInfo(name, about)
    .then((userData) => {
      userInfo.setUserInfo(userData);
      editProfilePopup.close();
    })
    .finally(() => {});
}

function handleAddNewCardSubmit(cardData) {
  // renderCard(cardData, cardsWrap);
  api
    .createCard(cardData)
    .then((res) => {
      console.log(res);
      // const card = createCard(cardData);
      createCard(res);
      newCardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

//Confirm Delete Popup Render

const confirmDelete = new PopupWithConfirmation("#confirm-modal");
confirmDelete.setEventListeners();

function handleDeleteButton(card) {
  console.log("Delete button clicked");
  confirmDelete.open();
  console.log(card._id);
  confirmDelete.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then(() => {
        confirmDelete.close();
        card.handleDeleteCard();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  console.log(card);
}

//Handle Profile Pic Submit
function handleAvatarFormSubmit(inputValues) {
  setButtonText(avatarModalButton, "Saving...");
  console.log(inputValues);
  api
    .updateAvatar(inputValues.link)
    .then((res) => {
      userInfo.setUserAvatar(inputValues.link);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err).finally(() => {
        setButtonText(avatarModalButton, "Save");
      });
    });
}

//EVENT LISTENERS----------------------
profileImageButton.addEventListener("click", () => {
  avatarPopup.open();
});

profileImage.addEventListener("click", () => {
  avatarPopup.open();
  editProfilePictureValidator.resetValidation();
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

//Form Validators--------------------------

const addFormValidator = new FormValidator(config, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(config, profileEditForm);
editFormValidator.enableValidation();

const editProfilePictureValidator = new FormValidator(
  config,
  editProfilePictureForm
);
editProfilePictureValidator.enableValidation();

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

//Profile Pic Popup

const avatarPopup = new PopupWithForm(
  "#profile-picture-modal",
  handleAvatarFormSubmit
);
avatarPopup.setEventListeners();
