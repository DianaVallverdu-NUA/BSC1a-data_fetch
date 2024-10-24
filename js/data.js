/**
 * gets a random dog form the api
 * @returns json with image url
 */
async function getRandomDog() {
  //random url
  const url = "https://dog.ceo/api/breeds/image/random";

  try {
    //get response
    const response = await fetch(url);

    //look for errors
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    //transform response to json -{message: `url`; status: 'success'}
    const json = await response.json();
    return json;

    //log error if error
  } catch (error) {
    console.error(error.message);
  }
}

/**
 * on success update image source what's stored in the message
 * @param {Object} result {message: `url`, status: `status`}
 */
function onFetchSuccess(result) {
  image.src = result.message;
}

/**
 * if an error is thrown -> display in console
 * @param {Error} error 
 */
function onFetchError(error) {
  console.error(error);
}