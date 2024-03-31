// Import the createUser function from createUser.js
const createUser = require('./createUser');

// Import the getUser function from getUser.js
const getUsers = require('./getUsers');

// Import the deleteUser function from deleteUser.js
const deleteUser = require('./deleteUser');

// Define a function to wait for a specified amount of time
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//user object
const newUser = {
    id: 69420,
    firstName: "Test",
    lastName: "User",
    email: "testuser@example.com",
    age: 30,
    hobbies: ["coding", "gaming"],
    address: {
      street: "789 Main St",
      city: "New York",
      state: "NY",
      zip: "10001"
    }
};

// Define an async function to execute the operations
async function executeUserTest() {
  try {
    console.log("Executing user test. Create user test will be performed first.");
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

    console.log("Create user test completed. Now fetching user details...");
    getUsers()
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // Wait for 1 second
    await wait(1000);

    console.log("Fetching user details completed. Now deleting the user...");
    // Call the deleteUser function and wait for it to complete
    deleteUser(newUser.id).then(response => {
        console.log('Response:', response);
    }).catch(error => {
        console.error('Error:', error);
    });
    
    console.log("Delete user test completed.");
    // Wait for 1 second
    await wait(1000);

    console.log("successfully completed all user tests.");
  } catch (error) {
    console.error("Operation failed:", error);
    process.exit(1); // Exit the script with a failure code
  }
}

module.exports = executeUserTest;
