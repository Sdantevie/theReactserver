'use strict';
const express = require('express');
const app = express();
const path = require('path');


app.set('port', (process.env.PORT || 8080));




// app.get('/', (req, res) => {
//     res.send({ express: 'Hello From Express' });
// });

// Serve any static files
app.use(express.static(path.join(__dirname + '/../app', 'build')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../app', 'build', 'index.html'));
});



app.listen(app.get('port'), () => {
    console.log(`the api is running on ${app.get('port')}`);
});