//select favourites div
const favouritesDiv = document.getElementById("favourites-div");

//select favourites button
const addFavouriteButton = document.getElementById("add-favourite-button");

//current image stores image currently displayed - updated in database.js onFetchRandomDog function
let currentImage = undefined;

//list of all favourites used to manage repetitions
let favouritesList = [];

/**
 * Create new image element and append it to the favorites div
 */
function onAddFavouriteButtonClick() {
    //check currently displayed image not in list already
    if (favouritesList.includes(currentImage)) return;

    //add currently displayed image to favourites list
    favouritesList.push(currentImage);

    //create newImage and update source
    const newImage = document.createElement("img");
    newImage.src = currentImage;
    newImage.classList.add("favourite-img");

    //append as child
    favouritesDiv.append(newImage);
}

//link events
addFavouriteButton.onclick = onAddFavouriteButtonClick;