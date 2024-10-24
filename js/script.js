const image = document.getElementById("image");
const getRandomButton = document.getElementById("random-button");

function fetchRandom() {
  getRandomDog().then(onFetchSuccess, onFetchError);
}

getRandomButton.onclick = fetchRandom;

fetchRandom();
