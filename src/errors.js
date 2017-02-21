class SendableError {
  constructor (msg, code) {
    this.msg = msg
    this.code = code
  }
  send (res) {
    res.status(this.code)
    res.send({ status: 'error', message: this.msg })
  }
}

module.exports = {
  SEED_FILE_NOT_FOUND: new SendableError('File not found', 404),
  INFOHASH_PARSE: new SendableError('Can\'t parse infoHash', 422),
  TORRENT_ALREADY_ADDED: new SendableError('Torrent already added', 400),
  INFOHASH_NOT_FOUND: new SendableError('Torrent not found', 404),
  CANT_CREATE_TORRENT: new SendableError('Could not create torrent.', 502)
}
