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
  downloadButton.innerHTML = "Download";
  downloadButton.onclick = downloadImage;

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";
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
