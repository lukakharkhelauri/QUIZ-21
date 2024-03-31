const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const posts = [
    { id: 1, title: 'First Post', content: 'first content' },
    { id: 2, title: 'Second Post', content: 'second content' }
  ];

  let comments = [
    { postId: 1, commentId: 1, text: "posting", author: "gio" },
    { postId: 2, commentId: 2, text: "creating", author: "nika" },
  ];

// GET /posts:
app.get('/posts', (req, res) => {
    res.json(posts);
});

// GET /posts/:id:
app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(post => post.id === postId);
    if (post) {
      res.json(post);
    }
})

// POST /posts:
app.post("/posts", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    createdAt: new Date()
  };
  posts.push(newPost);
  console.log(posts.slice(-1));
  res.json(newPost);
});

// PUT /posts/:id:
app.put("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const updatedPost = {
      id: postId,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      createdAt: new Date()
    };
  
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      posts[postIndex] = updatedPost;
      res.json(updatedPost);
    }
});

// DELETE /posts/:id:
app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
      posts.splice(postIndex, 1);
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: `Post with id: ${postId} not found. No posts were deleted.` });
    }
});

// GET /posts/:id/comments:
app.get("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const postComments = comments.filter(comment => comment.postId === postId);
    res.json(postComments);
});

// POST /posts/:id/comments:
app.post("/posts/:id/comments", (req, res) => {
    const postId = parseInt(req.params.id);
    const newComment = {
      postId: postId,
      commentId: comments.length + 1,
      text: req.body.text,
      author: req.body.author,
      createdAt: new Date()
    };
    comments.push(newComment);
    console.log(comments.slice(-1));
    res.json(newComment);
  });

// PUT /posts/:postId/comments/:commentId:
app.put("/posts/:postId/comments/:commentId", (req, res) => {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
  
    const commentIndex = comments.findIndex(comment => comment.postId === postId && comment.commentId === commentId);
    if (commentIndex !== -1) {
      comments[commentIndex].text = req.body.text;
      comments[commentIndex].author = req.body.author;
      res.json(comments[commentIndex]);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  });

// DELETE /posts/:postId/comments/:commentId:
app.delete("/posts/:postId/comments/:commentId", (req, res) => {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const commentIndex = comments.findIndex(comment => comment.postId === postId && comment.commentId === commentId);
    if (commentIndex !== -1) {
      comments.splice(commentIndex, 1);
      res.sendStatus(200); 
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});