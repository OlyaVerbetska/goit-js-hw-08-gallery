import images from "./gallery-items.js";

const makeGalleryItems = images.map((image) => {
  let imageTag = document.createElement("img");
  imageTag.classList.add("gallery__image");
  imageTag.setAttribute("src", image.preview);
  imageTag.setAttribute("data-source", image.original);
  imageTag.setAttribute("alt", image.description);
  let linkTag = document.createElement("a");
  linkTag.classList.add("gallery__link");
  linkTag.setAttribute("href", image.original);
  let listItemTag = document.createElement("li");
  listItemTag.classList.add("gallery__item");

  linkTag.append(imageTag);
  listItemTag.append(linkTag);
  return listItemTag;
});

const refs = {
  gallery: document.querySelector("ul.js-gallery"),
  largeImageRef: document.querySelector(".lightbox__image"),
  modalRef: document.querySelector("div.lightbox"),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlayRef: document.querySelector(".lightbox__overlay"),
};

refs.gallery.append(...makeGalleryItems);

function onImageClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  refs.modalRef.classList.add("is-open");

  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;
  setLargeImageSrc(largeImageURL);
}

function setLargeImageSrc(url) {
  refs.largeImageRef.src = url;
}

function closeModal() {
  refs.modalRef.classList.remove("is-open");
  refs.largeImageRef.src = "";
}

function closeModalWithEscape(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

refs.gallery.addEventListener("click", onImageClick);
refs.closeModalBtn.addEventListener("click", closeModal);
refs.overlayRef.addEventListener("click", closeModal);
window.addEventListener("keydown", closeModalWithEscape);
