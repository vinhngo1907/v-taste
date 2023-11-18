const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const commentByPostId = {};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentByPostId[req.params.id] || [];
    comments.push({ id, content, status: 'pending' });

    commentByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreate',
        data: { id, content, postId: req.params.id, status: 'pending' },
    });

    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentModerated') {
        const { postId, id, status } = data;
        const comments = commentByPostId[postId];
        const comment = comments.find((cmt) => cmt.id === id);
        comment.status = status;

        await axios
            .post('http://event-bus-srv:4005/events', {
                type: 'CommentUpdated',
                data: { ...comment, postId },
            })
            .catch((e) => console.log(e));
    }
    res.send({});
});

app.listen(4001, () => console.log('Comments on port 4001'));