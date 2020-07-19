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


//middleware to handle cars
app.use('/cars', cars);


//index.html: Angular App
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//Images
app.get('/img/*', function (req, res) {
    res.send(express.static(path.join(__dirname, './../public/img/')));
});

//nothing found
app.get('*', function (req, res) {
    res.send('404 Not Found'); //TODO : return 404 page
});


app.listen(serverListenPort, function () { //TODO : make an HTTPS server instead
console.log('App is listening on port '+serverListenPort);
});