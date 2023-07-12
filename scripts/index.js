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

//SELECTORS----------------------
const cardsWrap = document.querySelector(".elements__cards");
const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-button-close"
);
const addCardForm = addCardModal.querySelector(".modal__form");

const addCardTitleInput = addCardForm.querySelector("#title-modal-input");
const addCardUrlInput = addCardForm.querySelector("#image-url-modal-input");

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-button-close"
);
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#name-modal-input");
const profileDescriptionInput = document.querySelector(
  "#description-modal-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
// const addCardForm = addCardModal.querySelector(".modal__form");

const elementTemplate =
  document.querySelector("#element-template").content.firstElementChild;
const elementCardList = document.querySelector(".elements__cards");

//FUNCTIONS----------------------
function closePopup(modal) {
  // profileEditModal.classList.remove("modal_opened");
  modal.classList.remove("modal_opened");
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function renderCard(elementData, wrapper) {
  const cardElement = getCardElement(elementData);
  wrapper.prepend(cardElement);
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
  renderCard({ name, link }, cardsWrap);
  closePopup(addCardModal);
}

function getCardElement(elementData) {
  const cardElement = elementTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector(".elements__image");
  const elementTitle = cardElement.querySelector(".elements__title");
  const likeButton = cardElement.querySelector(".elements__like-button");
  const trashButton = cardElement.querySelector(".elements__trash-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  //add click listenerto teh cardImage elelemt. openModal with previewImageModal

  elementTitle.textContent = elementData.name;
  elementTitle.alt = elementData.name;
  elementImage.src = elementData.link;
  return cardElement;
}

// profileEditButton.addEventListener("click", () => {
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
// profileEditModal.classList.add("modal_opened");
// });

//EVENT LISTENERS----------------------
profileEditButton.addEventListener("click", () => {
  openPopup(profileEditModal);
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
});

profileModalCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddNewCardSubmit);

addNewCardButton.addEventListener("click", () => openPopup(addCardModal));
addCardModalCloseButton.addEventListener("click", () =>
  closePopup(addCardModal)
);

initialCards.forEach((elementData) => renderCard(elementData, cardsWrap));

// const likeButtons = document.querySelectorAll(".elements__like-button");
// likeButtons.forEach((likeButton) => {
//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("elements__like-button_active");
//   });
// });

// initialCards.forEach((elementData) => {
//   const cardElement = getCardElement(elementData);
//   elementCardList.append(cardElement);
// });

// addNewCardButton.addEventListener("click", () => {
//   profileNameInput.value = profileName.textContent;
//   profileDescriptionInput.value = profileDescription.textContent;
//   profileEditModal.classList.add("modal_opened");
// });
