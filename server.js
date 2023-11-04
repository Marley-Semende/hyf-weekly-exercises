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
    } else {
      res.send("Post created successfully");
    }
  });
});

//read
app.get("/blogs/:title", (req, res) => {
  const { title } = res.params;
  fs.readFile(`./${title}.txt`, "utf8", (err, data) => {
    if (err) {
      res.status(400).send("This post dosent exist!");
    } else {
      res.send(data);
    }
  });
});
//update post
app.put("/blogs/:title", (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  fs.writeFile(`./${title}.txt`, content, (err) => {
    if (err) {
      res.status(500).send("Error updating the post");
    } else {
      res.send("Post updated successfully");
    }
  });
});

//delete post

app.delete("/blogs/:title", (req, res) => {
  const { title } = req.params;

  fs.unlink(`./${title}.txt`, (err) => {
    if (err) {
      res.status(404).send("This post does not exist");
    } else {
      res.send("Post deleted successfulyy.");
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
