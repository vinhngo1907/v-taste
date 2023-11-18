const express = require("express");
const cors = require("cors");
const { randomBytes } = require('crypto');
const axios = require("axios");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cors);

const posts = {};

app.get("/posts", async (req, res) => {
    res.send(posts);
});

app.post("/posts/create", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = { id, title };

    try {
        await axios.post("http://event-bus-srv:4005/events", { type: 'PostCreate', data: { id, title } });
    } catch (error) {
        console.log(error);
    }

    res.status(201).send(posts[id]);
});

app.post("/event", (req, res) => { });

app.listen(4000, () => {
    console.log("Server started 4000");
});