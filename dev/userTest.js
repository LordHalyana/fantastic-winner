// Import the createUser function from createUser.js
const createUser = require('./createUser');

// Define a function to wait for a specified amount of time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//user object
const newUser = {
    id: "69420",
    name: "Test User",
    email: "testuser@example.com"
};


// Define an async function to execute the operations
async function executeOperations() {
  try {
    console.log("Executing operations... Create user test will be performed first.");
    // Call the createUser function and wait for it to complete

    createUser(newUser)
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Wait for 1 second
    await wait(1000);



    // Wait for 1 second
    await wait(1000);

    console.log("successfully completed all operations.");
  } catch (error) {
    console.error("Operation failed:", error);
    process.exit(1); // Exit the script with a failure code
  }
}

// Call the executeOperations function
executeOperations();
