const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const commentByPostId = {};
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/posts/:id/comments', async (req, res) => {
    res.send(commentByPostId[req.params.id] || []);
});

app.post('/post/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentByPostId[req.params.id] || [];
    comments.push({ id, content, status: 'pending' });

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreate',
        data: { id, content, postId: req.params.id, status: 'pending' }
    })
});

app.listen(4001, () => console.log("Comments on port 4001"));