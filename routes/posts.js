const express = require("express");
const router = express.Router();
const fs = require("fs");

// GET /posts reads the database end replies with all the posts in the database.
router.get("/", (req, res) => {
  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while reading the file.");
    } else {
      res.send(JSON.parse(data));
    }
  });
});

// POST /posts creates a new post in the database.
router.post("/", (req, res) => {
  const { title, description } = req.body;
  console.log(req.body);
  console.log(title + " is the title to be added");

  if (!title || !description) {
    res.status(400).send("All fields (title, description) are required.");
    return;
  }

  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while reading the file.");
    } else {
      const posts = JSON.parse(data);
      posts.push(req.body);
      fs.writeFile(
        "./data/posts.json",
        JSON.stringify(posts, null, 2),
        (err) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send("An error occurred while writing to the file.");
          } else {
            res.status(201).send("New post added successfully.");
          }
        }
      );
    }
  });
});

// Delete /post deletes a post from the database.
router.delete("/", (req, res) => {
  const { title } = req.body;
  console.log(title + " is the title to be purged");

  if (!title) {
    res.status(400).send("Title is required.");
    return;
  }

  fs.readFile("./data/posts.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred while reading the file.");
    } else {
      let posts = JSON.parse(data);
      const initialLength = posts.length;
      posts = posts.filter((post) => post.title !== title);
      if (initialLength === posts.length) {
        res.status(404).send("Post not found.");
        return;
      }
      fs.writeFile(
        "./data/posts.json",
        JSON.stringify(posts, null, 2),
        (err) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send("An error occurred while writing to the file.");
          } else {
            res.status(200).send("Post deleted successfully.");
          }
        }
      );
    }
  });
});



module.exports = router;