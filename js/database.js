//image generator section
const dogImage = document.getElementById("dog-image");
const randomDogButton = document.getElementById("random-dog-button");

//selects section
const breedSelect = document.getElementById("breed-select");
const subBreedSelect = document.getElementById("sub-breed-select");

async function fetchBreedPossibilities() {
    const breedListUrl = "https://dog.ceo/api/breeds/list";

    //try to fetch url and display error otherwise
    try {
        //get response from api
        const response = await fetch(breedListUrl);

        //check response ok
        if (!response.ok) {
            throw new Error("Response status: " + response.status);
        }

        //transform response to json
        const json = await response.json();

        const breedsList = json.message;

        for (const breed of breedsList) {
            //populate breed select
            const newOption = document.createElement("option"); //create new option element
            newOption.text = breed;
            breedSelect.options.add(newOption, breed);
        }

    } catch (error) {
        console.error(error);
    }
}

async function fetchRandomDog() {
    try {
        //random dog url
        const randomDogUrl = "https://dog.ceo/api/breeds/image/random";

        //get response from server
        const response = await fetch(randomDogUrl);

        //check response is ok
        if(!response.ok) {
            throw new Error("Response status: " + response.status);
        }

        //get json and message objects
        const json = await response.json();
        const message = json.message;

        //update image with received source
        dogImage.src = message;

    } catch (error) {
        console.log(error);
    }
}

//link buttons to events
randomDogButton.onclick = fetchRandomDog;

//functions to be executed at the beginning of the code
fetchRandomDog();
fetchBreedPossibilities();