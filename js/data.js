/**
 * fetch given a url
 * @param {*} url 
 * @returns 
 */
async function fetchURL(url) {
  try {
    //get response
    const response = await fetch(url);

    //look for errors
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    //transform response to json -{message: info needed; status: 'success'}
    const json = await response.json();
    return json.message;
  } catch (error) {
    console.error(error);
  }
}