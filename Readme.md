# Data Fetch

This repository contains a data fetch exercise where a random dogs api is fetched to display pictures of dogs on the screen. The user can interact with the webpage in the following way:

- A breed selector allows them to choose a breed from which to get dogs
- A subbreed selector allows them to choose a subbreed within a breed from which to get dogs
- A button allows them to get a new random dog. If breed or both breed & subreed are selected, the random dog will be chosen within those parameters.
- A button allows them to add a dog to a list of favourites.
  - Favourites can be deleted with a Delete button.
  - Favourites can be downloaded with a Download button.

[See a live example heres](https://dianavallverdu-nua.github.io/BSC1a-data_fetch/)

We are using the [DOG Ceo API](https://dog.ceo/dog-api/documentation/).

## HTML & CSS

The HTML and CSS for this exercise are left as an exercise. You can take the [diagram](https://miro.com/app/board/uXjVLOozKTc=/?moveToWidget=3458764604340767062&cot=14) and [visualisation](https://miro.com/app/board/uXjVLOozKTc=/?moveToWidget=3458764604869904107&cot=10) from the exercise's miro board as a guide.

## Step By Step

Here follows a guide of how to code the JavaScript. The JavaScript has been separate into two files: the `database.js` file, which is in charge of managing dog API interactions, and the `favourites.js` file, which is in charge of managing the favourites interactions.

Before  continuing, make sure that you have created the two JS files and linked them to your html.

### A Single Fetch

To fetch data in JavaScript, we need to use the [`fetch` API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). This comes with a function, also named `fetch`. The typical way to use this function when working with databases is with the following code:

```JS
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
```

In this function:

- `async` marks that this function will be executed asynchronously. This is necessary to allow for the `await` keyword to happen. Fetching as a process is asynchronous - JS needs to wait for the server to return a response. For this reason the `async` and `await` are necessary.
- `try / catch` are needed to catch any possible errors with the fetching process.

More info in slides from class.

### Random Dog Upon Button Press

1. Copy the function above into your `database.js`
2. Test that it works by executing the following line from an open console in the browser `fetchFromAPI("https://dog.ceo/api/breeds/image/random")`. This should return a url that points to a dog image source.

Now that this function is coded, let's move on to implementing the random dog selector:

1. Create a new `async` function with name `fetchRandomDog` that `awaits` for the `fetchFromAPI("https://dog.ceo/api/breeds/image/random")` to be executed:

```JS
async function fetchRandomDog() {
    //define random dog url
    let randomDogUrl = "https://dog.ceo/api/breeds/image/random";

    //get image source from api
    const imageSource = await fetchFromAPI(randomDogUrl);

    //log source
    console.log(imageSource);
}
```

2. Create a const variable with name `dogImage`, which points to the `img` element that contains the dog image.

3. In your function, replace the `console.log(imageSource)` with: `dogImage.src = imageSource`.

4. At the end of the script, add a simple execution of the random dog, so that it is executed when the page loads:

```JS
fetchRandomDog();
```

Having done this, you should be able to see your dog appearing every time you refresh the page. You can link it to a button like we always do:

5. Create a const variable with name `randomDogButton`, which points to the `button` element that displays text: "Get Random Dog".

6. Link the Event `click` of the `randomDogButton` Element to the function `fetchRandomDog`.

Now, every time that button is clicked, you should be able to see a new random dog. As always, remember to check your `console` if it's not working ;)

### Breed Selector

To add the possibility to select by breed we have to do two things: firstly add the possible breeds in the selector, secondly use the selected breed upon fetch. Let's start by displaying the possible breeds:

1. Create a const variable with name `breedSelect`, which points to the first `select` element in the page.

2. Add the following function to your page:

```JS
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
```

This function:

- Fetches the list of breeds from the API, by using the previously created fetch function.
- Creates new elements in the page using the [`document.createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) function.
- One option is created by breed, which is added to the select as a possible option.

3. Just like we did with the `fetchRandomDog`, execute this function at the bottom of the `database.js` file.

Now, upon page refresh, you should see the random breeds appearing in the select.

Let's continue by using this information when fetching a new random dog:

1. Inside the `fetchRandomDog` function, before fetching from the api, add a conditional statement to modify the fetch url depending on the breed selector:

```JS
//update with breed if needed
if (breedSelect.value !== "any") {
    randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/images/random";
}
```

Now, your breed selector should be working.

### Sub Breed Selector

Let's do the same for the sub breed selector. This process is a bit more complicated. Let's start by creating the display of possible sub breeds.

1. Create a const variable with name `subBreedSelect`, which points to the second `select` element in the page.

2. Add the following function to your page:

```JS
async function fetchSubBreedPossibilities() {
    while (subBreedSelect.options.length > 0) {
        subBreedSelect.remove(0); //removes the option at position 0
    }

    const newOption = document.createElement("option");
    newOption.text = "any";
    subBreedSelect.options.add(newOption, "any");

    if(breedSelect.value === "any") return;

    const breedListUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/list";

    const breedsList = await fetchFromAPI(breedListUrl);

    for (const breed of breedsList) {
        //populate breed select
        const newOption = document.createElement("option"); //create new option element
        newOption.text = breed;
        subBreedSelect.options.add(newOption, breed);
    }
}
```

As you can see, the function is a bit more complicated than before. Let's look at the changes:

- Instead of just doing the fetch, a combination of `while` and `remove` ensure that all subBreeds are removed from the options list at the beginning. This is because this function will be called every time the `breedSelect` changes, so we need to "clean up" any possible sub breeds that were present before.
- Then it adds the option `any` anew. This is because in the previous line that option would have been deleted.
- Sub breeds will then only be fetched if `breedSelect` is selected. If `breedSelect` is set to `any`, there are now possible sub breeds.
- The url also changes, as it now needs to take into account the `breed` so that it can fetch sub breeds.

3. Finally, link the Event `change` of the `breedSelect` to this function.

Now, upon `breedSelect` change, you should be seeing the sub breeds appearing.

Let's continue by using this information when fetching a new random dog:

1. Inside the `fetchRandomDog` function, before fetching from the api, add a second conditional statement to modify the fetch url depending on the breed selector:

```JS
if(subBreedSelect.value !== "any") {
    randomDogUrl = "https://dog.ceo/api/breed/" + breedSelect.value + "/" + subBreedSelect.value + "/images/random"
}
```

Now, your subbreed selector should be working.

### Favourites

The step by step of the Favourites List has not been added as it was an addition unrelated to data fetching. You can look at the `favourites.js` file to learn that.
