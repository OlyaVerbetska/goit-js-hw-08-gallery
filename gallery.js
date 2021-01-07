import images from "./gallery-items.js";

const makeGalleryItems = images.map((image, idx) => {
  let imageTag = document.createElement("img");
  imageTag.classList.add("gallery__image");
  imageTag.setAttribute("src", image.preview);
  imageTag.setAttribute("data-source", image.original);
  imageTag.setAttribute("data-index", idx);
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

function scrollGallery(event) {
  if (!refs.modalRef.classList.contains("is-open")) {
    return;
  }
  const imagesRefs = refs.gallery.querySelectorAll("img");
  const currentImage = [...imagesRefs].find(
    (arrayImage) => arrayImage.dataset.source === refs.largeImageRef.src
  );
  const currentImageIndex = Number(currentImage.dataset.index);

  if (event.code === "ArrowLeft") {
    if (currentImageIndex - 1 === -1) {
      return;
    }
    const prevImage = [...imagesRefs].find(
      (arrayImage) => Number(arrayImage.dataset.index) === currentImageIndex - 1
    );
    refs.largeImageRef.src = prevImage.dataset.source;
  }

  if (event.code === "ArrowRight") {
    if (currentImageIndex + 1 === imagesRefs.length) {
      return;
    }
    const nextImage = [...imagesRefs].find(
      (arrayImage) => Number(arrayImage.dataset.index) === currentImageIndex + 1
    );
    refs.largeImageRef.src = nextImage.dataset.source;
  }
}

refs.gallery.addEventListener("click", onImageClick);
refs.closeModalBtn.addEventListener("click", closeModal);
refs.overlayRef.addEventListener("click", closeModal);
window.addEventListener("keydown", closeModalWithEscape);
window.addEventListener("keydown", scrollGallery);
