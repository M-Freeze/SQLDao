"use strict";

console.log('\nLoading server...');
const WEB = `${__dirname}/web`;
let express = require('express');
var app = express();

//Load express 3rd party middleware modules
var logger = require('morgan');
var compression = require('compression');
var favicon = require('serve-favicon');
var rest = require('./tasksREST.js');


//Use express middleware
app.use(logger('dev'));
app.use(compression());
app.use('/api/v1',rest);
app.use(favicon(`${WEB}/favicon.jpg`));


//Serve up static files
app.use(express.static(WEB));

//Handle 404's
app.get('*', function (req, res) {
    res.status(404).sendFile(`${WEB}/404.html`);
});

//Start server
app.listen(8080, function () {
    console.log('Listening on port 8080');
});