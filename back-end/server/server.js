"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// Create a new express app instance
var app = express();
var serverListenPort = 80;
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(8080, function () {
    console.log('App is listening on port 8080!');
});
