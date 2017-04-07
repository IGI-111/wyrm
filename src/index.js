#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const WebTorrent = require('webtorrent');
const program = require('commander');

program
  .option('-f, --files [path]', 'directory to store downloaded files')
  .option('-p, --port [port]', 'port to listen on')
  .parse(process.argv);

const port = program.port ? parseInt(program.port) : 6060;
const downloadPath = program.files ? program.files : '/tmp/wyrm/';

const bt = new WebTorrent();

module.exports = {
  client: bt,
  env: { port, downloadPath }
};

const web = express();

web.use(bodyParser.urlencoded({ extended: false }));
web.use(bodyParser.json());
web.use('/', require('./routes'));

web.listen(port, _ => console.log(`Listening on port ${port}.`));
