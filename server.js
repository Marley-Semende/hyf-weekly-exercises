const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

//blog post
app.post("/blogs", (req, res) => {
  const { title, content } = req.body;

  fs.writeFile(`./${title}.txt`, content, (err) => {
    if (err) {
      res.status(500).send("Error creating the post");
    }
  });
});

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
