"use strict";

const http               = require('http');
const express            = require('express');

const WebFeedRelay = require('./lib/httpstream');
const app                = express();



  //public website
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/vendor/dist'));

const server  = http.createServer(app);

var source = {
  width     : 1280,
  height    : 720,
  // using default websocket feed port of 8081
};
const feed    = new WebFeedRelay(server, source);


server.listen(8080);




