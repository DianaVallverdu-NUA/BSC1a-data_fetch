const favDiv = document.getElementById("favourites-div");
const favButton = document.getElementById("add-fav-button");

const favDogs = [];

let currentImgSrc = "";
let currentBreed = "";
let currentSubBreed = "";

function createNewFavouriteDog() {
  //image
  const newImage = document.createElement("img");
  newImage.src = currentImgSrc;
  newImage.classList.add("favourite-img");

  //buttons
  const downloadButton = document.createElement("button");
  downloadButton.innerHTML = "Download";

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";

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
