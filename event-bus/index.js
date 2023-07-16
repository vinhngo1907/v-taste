const express = require('express');
const axios = require('axios');

const app = express();

const events = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/events", async (req, res) => {
    res.send(events)
})

app.listen(4005, () => console.log('Event bus is listening on port 4005'));
