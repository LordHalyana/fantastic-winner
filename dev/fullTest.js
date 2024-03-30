// Import the ping_test function from ping_test.js
const ping_test = require("./ping_test");

// Import the createPost function from createPost.js
const createPost = require("./createPost");

// Import the deletePost function from deletePost.js
const deletePost = require("./deletePost");

// Define an async function to execute the operations
async function executeOperations() {
  try {
    console.log("Executing operations... Ping test will be performed first.");
    // Call the ping_test function and wait for it to complete
    await ping_test();

    console.log("Ping test passed. Creating a post");

    // Call the createPost function and wait for it to complete
    await createPost(
      "WoW I created a Post!",
      "This post is created from the dev script createPost!"
    );

    console.log("Post created. Deleting the post...");

    // Call the deletePost function and wait for it to complete
    await deletePost("WoW I created a Post!");

    console.log("Post deleted successfully.");
  } catch (error) {
    console.error('Operation failed:', error);
    process.exit(1); // Exit the script with a failure code
  }
}

// Call the executeOperations function
executeOperations();