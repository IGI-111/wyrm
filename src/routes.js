const express = require('express');
const validate = require('express-validation');
const joi = require('joi');
const ctrl = require('./controllers');

const router = express.Router();

router.route('/torrent/:infoHash')
  // add new torrent by infohash
  .post(ctrl.addTorrent)
  // get info on existing torrent
  .get(ctrl.torrentInfo)
  // delete torrent
  .delete(ctrl.deleteTorrent);

router.route('/torrent')
  // add new torrent by infohash or magnet link
  .put(validate({body: {torrent: joi.string().required()}}), ctrl.addTorrent)
  // seed new torrent from specified files
  .post(validate({body: {path: joi.string().required()}}), ctrl.seedFile)
  // list all torrents
  .get(ctrl.listTorrents);

module.exports = router;
