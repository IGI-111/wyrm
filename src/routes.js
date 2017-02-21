const express = require('express')
const validate = require('express-validation')
const joi = require('joi')
const ctrl = require('./controllers')

const router = express.Router()

// Seed a new file or folder
router.route('/seed')
  .post(validate({body: {path: joi.string().required()}}), ctrl.seedFile)

// List all currently known infoHashes
router.get('/list', ctrl.listTorrents)

// Add a torrent to be downloaded by infohash
router.post('/add/:infoHash', ctrl.addTorrent)

// Add a torrent to be downloaded by infohash or magnet link
router.route('/add')
  .post(validate({body: {torrent: joi.string().required()}}), ctrl.addTorrent)

// Delete a torrent by infohash
router.delete('/delete/:infoHash', ctrl.deleteTorrent)

// Get information about a torrent by infohash
router.get('/info/:infoHash', ctrl.torrentInfo)

module.exports = router
