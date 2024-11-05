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

6. Link the Event `click` of the `randomDogButton` Element to the function `fetchRandomDog`