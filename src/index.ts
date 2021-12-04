import express = require('express');

const app = express();
const port = 80;

app.use(express.static('public'))

app.listen(port, ()=> {
    console.log(`Application running on port ${port}!`);
});