const favDiv = document.getElementById("favourites-div");
const favButton = document.getElementById("add-fav-button");

const favDogs = [];

let currentImgSrc = "";
let currentBreed = "";
let currentSubBreed = "";

/**
 * remove given dog from favorites
 */
function removeFavorite(event) {
  // Get the clicked button element
  const clickedButton = event.target;

  // Find the parent element that needs to be removed
  const parentToRemove = clickedButton.closest("div");

  //Find the image source
  const imageSource = parentToRemove.querySelector("img").src;

  // Remove the parent element from the DOM
  parentToRemove.remove();

  //Remove from array
  const index = favDogs.indexOf(imageSource);
  favDogs.splice(index, 1);
}

/**
 * Create all elements for favourite dog in HTML
 */
function createNewFavouriteDog() {
  //image
  const newImage = document.createElement("img");
  newImage.src = currentImgSrc;
  newImage.classList.add("favourite-img");

  //buttons
  const downloadButton = document.createElement("button");
  // downloadButton.innerHTML = "Download";
  downloadButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>';
  downloadButton.classList.add("button");
  downloadButton.classList.add("button-small");

  downloadButton.onclick = downloadImage;

  const removeButton = document.createElement("button");
  removeButton.innerHTML =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>';
  removeButton.classList.add("button");
  removeButton.classList.add("button-small");

  removeButton.onclick = removeFavorite;

  //containing div
  const containingDiv = document.createElement("div");
  containingDiv.classList.add("container");
  containingDiv.classList.add("favourite-container");

  containingDiv.appendChild(newImage);
  containingDiv.appendChild(downloadButton);
  containingDiv.appendChild(removeButton);

  favDiv.append(containingDiv);
}

function favButtonOnClick() {
  if (!favDogs.includes(currentImgSrc)) {
    favDogs.push(currentImgSrc);

    createNewFavouriteDog();
  }
}

favButton.onclick = favButtonOnClick;
