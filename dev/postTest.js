// Import the createPost function from createPost.js
const createPost = require("./createPost");

// Import the deletePost function from deletePost.js
const deletePost = require("./deletePost");

// Import the getPost function from getPost.js
const getPosts = require("./getPosts");

// Define a function to wait for a specified amount of time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Define an async function to execute the operations
async function executePostTest() {
  try {
    console.log("Executing post Test");

    await wait(1000);
    getPosts().then((data) => {
      console.log(data);
    });

    // Call the createPost function and wait for it to complete
    createPost(
      "WoW I created a Post!",
      "This post is created from the dev script createPost!"
    )
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

      
    // Wait for 1 second
    await wait(1000);

    console.log("Post created. Deleting the post...");

    // Call the deletePost function and wait for it to complete
    await deletePost("WoW I created a Post!");

    // Wait for 1 second
    await wait(1000);

    console.log("successfully completed all operations.");
  } catch (error) {
    console.error("Operation failed:", error);
    process.exit(1); // Exit the script with a failure code
  }
}

module.exports = executePostTest;