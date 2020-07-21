"use strict";
/**
 * File: server.ts
 * Desc: server entry point
 * Dev: Perhan Scudeller
 * Company: AutoSense AG
 * License:
 */
Object.defineProperty(exports, "__esModule", { value: true });
//imports
var express = require("express");
var path = require("path");
// Create a new express app instance
var app = express();
var serverListenPort = 80;
/* Import routes */
var cars = require('./../routes/cars');
/** To allow Cross Requests (Angular Debug Mainly) */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//middleware to handle cars
app.use('/cars', cars);
//index.html: Angular App
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './../public/main/index.html'));
});
//Images
app.get('/img/*', function (req, res) {
    app.use(express.static(path.join(__dirname, './../public/img/')));
});
//nothing found
app.get('*', function (req, res) {
    res.send('404 Not Found'); //TODO : return 404 page
});
app.listen(serverListenPort, function () {
    console.log('App is listening on port ' + serverListenPort);
});
