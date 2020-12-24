const express = require('express');
const app = express();
const PORT = 8080;

// DB coniguration
require('./src/database');

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});