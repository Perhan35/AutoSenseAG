import express = require('express');
// Create a new express app instance
const app: express.Application = express();
const serverListenPort = 80;


app.get('/cars', function (req, res) {
res.send('Hello World!'); //TODO : retrun index.html from Angular
});

    

app.listen(8080, function () {
console.log('App is listening on port 8080!');
});