// Fetch Data
const url =
  "https://scaleflex.cloudimg.io/v7/0.fe_task_static/pictures.json?vh=7a646d&func=proxy";
const data = fetch(url)
  .then((response) => response.json())
  .then((data) => renderGallery(data));

const galleryContainer = document.getElementById("gallery-container");
const modal = document.querySelector(".modal");
const modalContentImg = modal.querySelector(".content img");
const modalContentName = modal.querySelector(".content .name");
const modalClose = modal.querySelector(".controllers .close");
const modalCurrentImage = modal.querySelector(".controllers .current-image");
const modalBack = modal.querySelector(".controllers .back");
const modalNext = modal.querySelector(".controllers .next");

// Render Gallery Content
function renderGallery(data) {
  let galleryStructure = data.map((item) => {
    return `
            <div class="gallery-item">
                <img src="${item.url}" data-name="${item.name}" alt="${item.name}">
            </div>
        `;
  });

  galleryContainer.innerHTML = galleryStructure.join("");

  renderModal();
}

// Render Modal And Open
function renderModal() {
  const galleryImages = galleryContainer.querySelectorAll(".gallery-item img");
  let currentView = null;

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      changeView(
        img.src,
        img.dataset.name,
        `image ${index + 1}/${galleryImages.length}`
      );

      currentView = index;
      openModal();
    });
  });

  // Change to next view
  modalNext.addEventListener("click", () => {
    currentView = nextView(currentView, galleryImages);
  });

  // Change to prev view
  modalBack.addEventListener("click", () => {
    currentView = backView(currentView, galleryImages);
  });
}

// Close Modal On Click
modalClose.addEventListener("click", closeModal);

// Open model
function openModal() {
  modal.classList.add("open");
}

// Close Modal
function closeModal() {
  modal.classList.remove("open");
}

// Change to next view
function nextView(currentView, galleryImages) {
  const imagesCount = galleryImages.length;

  if (currentView == imagesCount - 1) {
    return imagesCount - 1;
  }

  const img = galleryImages[currentView + 1];
  changeView(
    img.src,
    img.dataset.name,
    `image ${currentView + 2}/${imagesCount}`
  );

  return currentView + 1;
}

// Change to prev view
function backView(currentView, galleryImages) {
  const imagesCount = galleryImages.length;

  if (currentView <= 0) {
    return 0;
  }

  const img = galleryImages[currentView - 1];
  changeView(img.src, img.dataset.name, `image ${currentView}/${imagesCount}`);

  return currentView - 1;
}

// Change  view
function changeView(imgSrc, imgName, currentImage) {
  modalContentImg.src = imgSrc;
  modalContentName.textContent = imgName;
  modalCurrentImage.textContent = currentImage;
}
