const RANDOM_DOG_API_URL = "https://dog.ceo/api/breeds/image/random";
const SINGLE_BREED_API = "https://dog.ceo/api/breed";
const ALL_BREEDS_API_URL = "https://dog.ceo/api/breeds/list";

const image = document.getElementById("image");
const getRandomButton = document.getElementById("random-button");
const breedsSelect = document.getElementById("breeds-select");
const subBreedsSelect = document.getElementById("sub-breeds-select");

const optionAny = document.createElement("option");
optionAny.text = "any";

/**
 *
 */
async function fetchRandom() {
  let imageURL;

  if (breedsSelect.value === "any")
    imageURL = await fetchURL(RANDOM_DOG_API_URL);
  else {
    if (subBreedsSelect.value === "any") {
      const apiURL =
        SINGLE_BREED_API + "/" + breedsSelect.value + "/images/random";

      imageURL = await fetchURL(apiURL);
    } else {
      const apiURL =
        SINGLE_BREED_API +
        "/" +
        breedsSelect.value +
        "/" +
        subBreedsSelect.value +
        "/images/random";

      imageURL = await fetchURL(apiURL);
    }
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

async function fetchSubBreeds() {
  if (breedsSelect.value === "any") return;

  //restart select
  while (subBreedsSelect.options.length > 0) {
    subBreedsSelect.remove(0);
  }

  //add first option
  subBreedsSelect.options.add(optionAny, "any");

  const url = SINGLE_BREED_API + "/" + breedsSelect.value + "/list";

  const subBreedsList = await fetchURL(url);

  for (const breed of subBreedsList) {
    const newOption = document.createElement("option");
    newOption.text = breed;
    subBreedsSelect.options.add(newOption, breed);
  }
}

getRandomButton.onclick = fetchRandom;
breedsSelect.onchange = fetchSubBreeds;

fetchRandom();
fetchPossibleBreeds();
