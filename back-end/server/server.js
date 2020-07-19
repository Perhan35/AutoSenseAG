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
var serverListenPort = 8080;
/* Import routes */
var cars = require('./../routes/cars');
//middleware to handle cars
app.use('/cars', cars);
//index.html: Angular App
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//favicon
app.get('/favicon', function (req, res) {
    res.send(express.static(path.join(__dirname, './../public/img/favicon.ico')));
});
//nothing found
app.get('*', function (req, res) {
    res.send('404 Not Found'); //TODO : return 404
});
app.listen(serverListenPort, function () {
    console.log('App is listening on port ' + serverListenPort);
});
