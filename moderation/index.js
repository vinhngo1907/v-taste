const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreate') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';
        await axios
            .post('http://event-bus-srv:4005/events', {
                type: 'CommentModerated',
                data: {
                    ...data,
                    status,
                },
            })
            .catch((e) => console.log(e));
    }
    res.send({});
});

app.listen(4003, () => console.log('Moderation listening on port 4003'));