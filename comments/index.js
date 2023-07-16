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

app.listen(4001, () => console.log("Comments on port 4001"));