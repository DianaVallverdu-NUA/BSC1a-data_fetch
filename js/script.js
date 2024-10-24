const RANDOM_DOG_API_URL = "https://dog.ceo/api/breeds/image/random";
const ALL_BREEDS_API_URL = "https://dog.ceo/api/breeds/list";

const image = document.getElementById("image");
const getRandomButton = document.getElementById("random-button");
const breedsSelect = document.getElementById("breeds-select");

/**
 *
 */
async function fetchRandom() {
  const imageURL = await fetchURL(RANDOM_DOG_API_URL);
  image.src = imageURL;
}

/**
 *
 */
async function fetchPossibleBreeds() {
  const breedsList = await fetchURL(ALL_BREEDS_API_URL);

  for (const index in breedsList) {
    const breed = breedsList[index];
    const newOption = document.createElement("option");
    newOption.text = breed;
    breedsSelect.options.add(newOption, index);
  }
}

getRandomButton.onclick = fetchRandom;

fetchRandom();
fetchPossibleBreeds();
