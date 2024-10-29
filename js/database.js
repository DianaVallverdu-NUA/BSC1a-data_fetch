//image generator section
const dogImage = document.getElementById("dog-image");
const randomDogButton = document.getElementById("random-dog-button");

//selects section
const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");

/**
 * Fetch information from any api and return the data in message
 * @param {string} url url to be fetched
 */
async function fetchFromAPI(url) {
    try {
        //get response from api
        const response = await fetch(url);

        //check response is ok
        if (!response.ok) {
            throw new Error("Response status: " + response.status);
        }

        //get json from response
        const json = await response.json();

        return json.message;

    } catch (error) {
        console.log(error);
    }
}

async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list";

    const breedsList = await fetchFromAPI(breedListUrl);

    for (const breed of breedsList) {
        //populate breed select
        const newOption = document.createElement("option"); //create new option element
        newOption.text = breed;
        breedSelect.options.add(newOption, breed);
    }

}

async function fetchRandomDog() {
    //define random dog url
    let randomDogUrl = "https://dog.ceo/api/breeds/image/random";

    //update with breed if needed
    if(breedSelect.value !== "any") {
        randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/images/random";
    }

    //get image source from api
    const imageSource = await fetchFromAPI(randomDogUrl);

    //update image with received source
    dogImage.src = imageSource;
}

//link buttons to events
randomDogButton.onclick = fetchRandomDog;

//functions to be executed at the beginning of the code
fetchRandomDog();
fetchBreedPossibilities();