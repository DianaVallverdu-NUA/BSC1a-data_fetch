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

/**
 * Download image from image source
 * @param {*} imageSrc
 */
async function downloadImage(imageSrc) {
  console.log(imageSrc);
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  console.log(imageURL);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = "cuteDog.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
