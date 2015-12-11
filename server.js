#! /usr/bin/env node

module.exports = function(){};

var getopt = require('node-getopt');
var WebTorrent = require('webtorrent');
var express = require('express');
var bodyParser = require('body-parser');

var opt = getopt.create([
    ['f', 'files=ARG', 'directory to store downloaded files'],
    ['p', 'port=ARG', 'port to listen on'],
    ['h', 'help', 'display this help message'],
]).bindHelp().parseSystem();

var port = parseInt(opt.options.port);
if(isNaN(port))
    port = 6006;

var path = opt.options.files;
if(path === undefined)
    path = '/tmp/wyrm/';


var bt = new WebTorrent();
var web = express();

web.use(bodyParser.json());
require('./routes')(web, bt, path);
web.listen(port);
console.log("Listening on " + port);
