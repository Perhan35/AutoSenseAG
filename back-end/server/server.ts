/** 
 * File: server.ts 
 * Desc: server entry point
 * Dev: Perhan Scudeller
 * Company: AutoSense AG
 * License: 
 */

//imports
import express = require('express');
import path = require('path');

// Create a new express app instance
const app: express.Application = express();
const serverListenPort = 80;


/* Import routes */
var cars = require('./../routes/cars');
var img = require('./../routes/img');


/** To allow Cross Requests (Angular Debug Mainly) */
/**
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/


//middleware to handle cars
app.use('/cars', cars);
app.use('/img', img);


//index.html: Angular App starting point
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './../public/main/index.html'));
});


// Sends Angular Application Files
app.use(express.static(path.join(__dirname, './../public/main/')));


//Not Found
app.get('*', function (req, res) {
    res.status(404).send('404 Not Found'); //TODO : return a nice 404 page
});


//Server
app.listen(serverListenPort, function () { //TODO : make an HTTPS server instead
console.log('App is listening on port '+serverListenPort);
});