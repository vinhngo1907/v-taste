const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.listen(4002, async () => {
    console.log("Query is running on port 4002");
})