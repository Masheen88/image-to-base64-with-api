//API Requests
// NOTE GET request from the API or local json file
const getComments = async () => {
  console.log("getting comment data from mockapi...");

  try {
    const response = await fetch(COMMENTS_ENDPOINT); // url you want get data from
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resp = await response.json(); // parsing the response as JSON
    return resp;
  } catch (error) {
    console.log("Oh no! There was an error with getting your comment.", error);
  }
};

// NOTE POST requests from the API or local json file
const postComment = async (commentData) => {
  console.log("posting comment", commentData);
  try {
    const response = await fetch(COMMENTS_ENDPOINT, {
      // url you want to post to
      method: "POST", // type of request
      headers: {
        "Content-Type": "application/json", // type of data sent to the server
      },
      body: JSON.stringify({ commentName: commentData }), // data you want to update
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resp = await response.json(); // parsing the response as JSON
    return resp;
  } catch (error) {
    console.log("Oh no! There was an error with posting your comment.", error);
  }
};

// NOTE PUT request from the API or local json file
const updateComment = async (commentData, commentId) => {
  console.log("updating comment", commentData);
  try {
    const response = await fetch(COMMENTS_ENDPOINT + `/${commentId}`, {
      // url + id you want to update
      method: "PUT", // type of request
      headers: {
        "Content-Type": "application/json", // type of data sent to the server
      },
      body: JSON.stringify({ commentName: commentData }), // data you want to update
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const resp = await response.json(); // parsing the response as JSON
    return resp;
  } catch (error) {
    console.log("Oh no! There was an error with updating your comment.", error);
  }
};

// NOTE DELETE request from the API or local json file
const deleteComment = async (commentId) => {
  console.log("deleting comment", commentId);
  try {
    const response = await fetch(COMMENTS_ENDPOINT + `/${commentId}`, {
      // url + id you want to delete
      method: "DELETE", // type of request
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response; // The DELETE request might not return a JSON response
  } catch (error) {
    console.log("Oh no! There was an error with deleting your comment.", error);
  }
};

const COMMENTS_ENDPOINT =
  "https://62c85d578c90491c2cb47da3.mockapi.io/Promineo_Tech_API/comments";

// Define an asynchronous function to post data to an API
const postToAPI = async () => {
  console.log("Posting to API...");

  // Get the first file selected in the input element with id 'image-input'
  const inputFile = document.getElementById("image-input").files[0];
  // Select the element where the base64 code will be displayed
  const base64Code = document.querySelector("#base64Code");

  // Create a FileReader object to read the inputFile
  const reader = new FileReader();

  // Define what happens when the file has been successfully read
  reader.onload = (e) => {
    // Create a new Image object
    const img = new Image();

    // Define what happens once the image is loaded
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      // Get the 2D drawing context for the canvas
      const ctx = canvas.getContext("2d");

      // Set the maximum dimensions for the compressed image
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 600;

      // Calculate the new dimensions to maintain aspect ratio
      let width = img.width;
      let height = img.height;

      // Adjust width and height to fit within the MAX_WIDTH and MAX_HEIGHT while keeping aspect ratio
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // Resize the canvas to the new dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw the image to the canvas, effectively compressing it
      ctx.drawImage(img, 0, 0, width, height);

      // Convert the canvas to a base64 string. This string represents the image data in a text form,
      // which can be easily transmitted or stored. The "image/jpeg" argument specifies the image format.
      // The second argument (0.7 here) specifies the quality of the output image on a scale from 0 to 1.
      const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

      // Use the compressed base64 string for further actions, e.g., displaying it or sending it to an API
      base64Code.value = compressedBase64;
      console.log("Compressed Base64 Code:\n", base64Code.value);

      // Function call (not shown in this snippet) to post the base64 string to an API or another destination
      postComment(base64Code.value);
    };

    // Set the source of the image to the result from the FileReader.
    // This triggers the img.onload event once the image is loaded into memory.
    img.src = e.target.result;
  };

  // Read the input file as a data URL. A data URL contains a base64-encoded string
  // that represents the file's data. This is useful for directly embedding images in web pages or CSS,
  // without needing to upload the image to a server.
  reader.readAsDataURL(inputFile);
};

let commentImage = document.getElementById("commentImage");
console.log("commentImage", commentImage);
//getComments from api and output id 3 to the commentImage
getComments().then((data) => {
  console.log("getting comment data from mockapi...", data);
  let finalImage = (commentImage.src = data[2].commentName);
  //convert the base64 string to an image data[2].commentName;

  console.log("finalImage", finalImage);
});

