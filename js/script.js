const SINGLE_BREED_API = "https://dog.ceo/api/breed";
const RANDOM_DOG_API_URL = "https://dog.ceo/api/breeds/image/random";
const ALL_BREEDS_API_URL = "https://dog.ceo/api/breeds/list";

const image = document.getElementById("image");
const getRandomButton = document.getElementById("random-button");
const breedsSelect = document.getElementById("breeds-select");

/**
 *
 */
async function fetchRandom() {
  let imageURL;

  if (breedsSelect.value === "any")
    imageURL = await fetchURL(RANDOM_DOG_API_URL);
  else {
    imageURL = await fetchURL(SINGLE_BREED_API + "/" + breedsSelect.value + "/images/random")
  }

  image.src = imageURL;


}

/**
 *
 */
async function fetchPossibleBreeds() {
  const breedsList = await fetchURL(ALL_BREEDS_API_URL);

  for (const breed of breedsList) {
    const newOption = document.createElement("option");
    newOption.text = breed;
    breedsSelect.options.add(newOption, breed);
  }
}

getRandomButton.onclick = fetchRandom;

fetchRandom();
fetchPossibleBreeds();
