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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const modalCloseButton = document.querySelector("#modal-button-close");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#name-modal-input");
const profileDescriptionInput = document.querySelector(
  "#description-modal-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const elementTemplate =
  document.querySelector("#element-template").content.firstElementChild;
const elementCardList = document.querySelector(".elements__cards");

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup();
}

function getCardElement(elementData) {
  const cardElement = elementTemplate.cloneNode(true);
  const elementImage = cardElement.querySelector(".elements__image");
  const elementTitle = cardElement.querySelector(".elements__title");

  elementTitle.textContent = elementData.name;
  elementTitle.alt = elementData.name;
  elementImage.src = elementData.link;
  return cardElement;
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((elementData) => {
  const cardElement = getCardElement(elementData);
  elementCardList.append(cardElement);
});
