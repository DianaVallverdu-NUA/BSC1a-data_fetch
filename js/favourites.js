//select favourites div
const favouritesDiv = document.getElementById("favourites-div");

//select favourites button
const addFavouriteButton = document.getElementById("add-favourite-button");

//select download all favourites
const downloadAllFavouritesButton = document.getElementById("download-all-favourites-button");

//current image stores image currently displayed - updated in database.js onFetchRandomDog function
let currentImage = undefined;

//list of all favourites used to manage repetitions
let favouritesList = [];

/**
 * Download image stored at given imageSrc
 * @param {string} imageSrc source of the database image 
 */
async function downloadImage(imageSrc) {
    //image fetch to get the specific image information
    const image = await fetch(imageSrc);
    //blob contains the specific data related to the image file instead of just the source url
    const imageBlob = await image.blob();
    //create a url object to point to the blob
    const imageURL = URL.createObjectURL(imageBlob);

    //create anchor element with href imageURL
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "cuteDog.png"; //set download name

    //force download by triggering the click event of the anchor element
    link.click();
}

/**
 * Download image closer to the download button clicked
 * @param {Event} event
 */
function onDownloadClick(event) {
    //find closest image with the help of closest and querySelector
    const clickedButton = event.target;
    const parentDiv = clickedButton.closest("div"); //closest -> looks for closest element of given type "up the tree"
    const imageElement = parentDiv.querySelector("img"); //querySelector -> looks for closest element of given type "down the tree"

    //trigger download asynchronously
    downloadImage(imageElement.src);
}

function onDownloadAllClick() {
    for (const imageSrc of favouritesList) {
        downloadImage(imageSrc);
    }
}

/**
 * Create new image element and append it to the favorites div
 */
function onAddFavouriteButtonClick() {
    //check currently displayed image not in list already
    if (favouritesList.includes(currentImage)) return;

    //add currently displayed image to favourites list
    favouritesList.push(currentImage);

    //create div that will contain everything favourite related
    const newDiv = document.createElement("div");
    newDiv.classList.add("container", "flex-column", "favourite-card");

    //create newImage and update source
    const newImage = document.createElement("img");
    newImage.src = currentImage;
    newImage.classList.add("favourite-img");

    //create downloadButton
    const downloadButton = document.createElement("button");
    downloadButton.innerHTML = "Download";
    downloadButton.onclick = onDownloadClick;

    //append newDiv childs
    newDiv.append(newImage);
    newDiv.append(downloadButton);

    //append div to favourites div
    favouritesDiv.append(newDiv);
}

//link events
addFavouriteButton.onclick = onAddFavouriteButtonClick;
downloadAllFavouritesButton.onclick = onDownloadAllClick;
