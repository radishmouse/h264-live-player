"use strict";

// const net    = require('net');
const merge  = require('mout/object/merge');
const Server = require('./_server');
const Stream = require('stream');
const http = require('http');

class WebStream extends Server {

  constructor(server, opts) {
    const feed_port = 8081;

    super(server, merge({
      feed_ip   : '127.0.0.1',
      feed_port : feed_port,
    }, opts));

    this.feed_port = feed_port;
    this.req = null;

    console.log('creating stream server');
    this.streamServer = http.createServer((request, response) => {
      response.connection.setTimeout(0);
      console.log(`Stream Connected: ${request.socket.remoteAddress}:${request.socket.remotePort}`);
      this.req = request;
    }).listen(this.feed_port, () => {
      console.log(`listening on feed port ${this.feed_port}`);
    });
    
  }

  get_feed() {

    // var readStream = net.connect(this.options.feed_port, this.options.feed_ip, function(){
      // console.log("remote stream ready");
    // });


    console.log('creating feed (passthrough to the...latest? request)');
    return this.req;

  }
}


module.exports = WebStream;
