#! /usr/bin/env node

module.exports.init = function(){};

var WebTorrent = require('webtorrent');
var express = require('express');
var bodyParser = require('body-parser');
var program = require('commander');

program
    .option('-f, --files [path]', 'directory to store downloaded files')
    .option('-p, --port [port]', 'port to listen on')
    .parse(process.argv);

var port = parseInt(program.port);
if(!program.port)
    port = 6006;

var path = program.files;
if(!program.files)
    path = '/tmp/wyrm/';


var bt = new WebTorrent();
var web = express();

web.use(bodyParser.json());
require('./routes')(web, bt, path);
web.listen(port);
console.log("Listening on " + port);
