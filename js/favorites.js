const favDiv = document.getElementById("favourites-div");
const favButton = document.getElementById("add-fav-button");

const favDogs = [];

let currentImg = "";
let currentBreed = "";
let currentSubBreed = "";

function createNewFavouriteDog() {
  //image
  const newImage = document.createElement("img");
  newImage.src = currentImg;
  newImage.classList.add("favourite-img");

  //text
  const newP = document.createElement("p");
  newP.innerHTML = currentBreed + " " + currentSubBreed;

  //buttons
  const downloadButton = document.createElement("button");
  downloadButton.innerHTML = "Download";

  const removeButton = document.createElement("button");
  removeButton.innerHTML = "Remove";

  //containing div
  const containingDiv = document.createElement("div");
  containingDiv.classList.add("container");

  containingDiv.appendChild(newImage);
  containingDiv.appendChild(newP);
  containingDiv.appendChild(downloadButton);
  containingDiv.appendChild(removeButton);

  favDiv.append(containingDiv);
}

function favButtonOnClick() {
  if (!favDogs.includes(currentImg)) {
    favDogs.push(currentImg);

    createNewFavouriteDog();
  }
}

favButton.onclick = favButtonOnClick;
