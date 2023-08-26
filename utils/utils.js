export function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closePopup(openedPopup);
  }
}

export function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeByEscape);
}
