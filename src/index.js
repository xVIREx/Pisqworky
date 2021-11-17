"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 8080;
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Application running on port ${port}!`);
});
