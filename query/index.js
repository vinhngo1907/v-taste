const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

const posts = {};

const handleEvents = (type, data) => {
    if (type === 'PostCreate') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    
    if (type === 'CommentCreate') {
        const { id, content, postId, status } = data;
        posts[postId].comments.push({ id, content, status });
    }

    if (type === 'CommentUpdated') {
        const { id, content, status, postId } = data;

        const post = posts[postId];
        const comment = post.comments.find((cmt) => cmt.id === id);
        comment.status = status;
        comment.content = content;
    }
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    handleEvents(type, data);
    res.send(posts);
});

app.listen(4002, async () => {
    console.log('Query running at 4002');
    try {
        const events = (await axios.get('http://event-bus-srv:4005/events')).data;
        for (let event of events) {
            console.log(`Processing event: ${event.type}`);
            handleEvents(event.type, event.data);
        }
    } catch (error) {
        console.log(error.message);
    }
});
