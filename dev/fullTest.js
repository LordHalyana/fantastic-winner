// Import the ping_test function from ping_test.js
const ping_test = require("./ping_test");
const postTest = require('./postTest');
const userTest = require('./userTest');

// Define a function to wait for a specified amount of time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Define an async function to execute the operations
async function executeOperations() {
  try {
    console.log("Executing operations... Ping test will be performed first.");
    // Call the ping_test function and wait for it to complete
    await ping_test();

    // Wait for 1 second
    await wait(10000);

    console.log("Ping test passed");

    await postTest();
    // Wait for 1 second
    await wait(10000);

    await userTest();


    console.log("successfully completed all operations.");
  } catch (error) {
    console.error("Operation failed:", error);
    process.exit(1); // Exit the script with a failure code
  }
}

// Call the executeOperations function
executeOperations();
