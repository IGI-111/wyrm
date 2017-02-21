const parseTorrent = require('parse-torrent')
const createTorrent = require('create-torrent')
const fs = require('fs')

const client = require('./index').client
const Errors = require('./errors')

const opts = {
  path: require('./index').env.downloadPath
}

module.exports = { seedFile, listTorrents, addTorrent, deleteTorrent, torrentInfo }

function seedFile (req, res, next) {
  console.log('Seeding new file')
  const path = req.body.path
  fs.stat(path, (err, exists) => {
    if (err) {
      return Errors.SEED_FILE_NOT_FOUND.send(res)
    }
    createTorrent(path, (createTorrentErr, torrentBuf) => {
      if (createTorrentErr) {
        return Errors.CANT_CREATE_TORRENT.send(res)
      }

      var existingTorrent = client.get(torrentBuf)
      if (existingTorrent) {
        return Errors.TORRENT_ALREADY_ADDED.send(res)
      }

      client.seed(path, opts, (torrent) => {
        console.log('seeding ' + torrent.infoHash + ' peerId=' + torrent.discovery.peerId)
        res.send({ infoHash: torrent.infoHash })
      })
    })
  })
}

function listTorrents (req, res, next) {
  let torrentHashes = client.torrents.map((t) => t.infoHash)
  res.json(torrentHashes)
}

function addTorrent (req, res, next) {
  let torrent = req.params.torrent !== undefined
    ? req.params.torrent
    : req.body.torrent

  try {
    parseTorrent(torrent)
  } catch (e) {
    return Errors.INFOHASH_PARSE.send(res)
  }

  if (client.get(torrent)) {
    return Errors.TORRENT_ALREADY_ADDED.send(res)
  }

  client.add(torrent, opts, (torrent) => {
    console.log('added ' + torrent.infoHash)
    res.send(torrent.torrent)
  })
}

function deleteTorrent (req, res, next) {
  let infoHash = req.params.infoHash
  try {
    parseTorrent(infoHash)
  } catch (e) {
    return Errors.INFOHASH_PARSE.send(res)
  }

  let infoHashList = client.torrents.map((t) => t.infoHash)
  if (!infoHashList.includes(infoHash)) {
    return Errors.INFOHASH_NOT_FOUND.send(res)
  }

  client.remove(infoHash, (err) => {
    console.log('removed ' + infoHash)
    if (err) {
      res.send({error: err.message})
    } else {
      res.send('removed')
    }
  })
}

function torrentInfo (req, res, next) {
  function pick (o, ...fields) {
    let res = {}
    fields.forEach((f) => { res[f] = o[f] })
    return res
  }

  let infoHash = req.params.infoHash
  try {
    parseTorrent(infoHash)
  } catch (e) {
    return Errors.INFOHASH_PARSE.send(res)
  }

  let torrent = client.get(infoHash)
  if (!torrent) {
    return Errors.INFOHASH_NOT_FOUND.send(res)
  }

  res.json(pick(torrent,
    'name',
    'infoHash',
    'timeRemaining',
    'received',
    'downloaded',
    'uploaded',
    'downloadSpeed',
    'uploadSpeed',
    'progress',
    'length',
    'ratio',
    'numPeers',
    'path'
  ))
}
