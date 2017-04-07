<h1 align="center">
  <a href="https://github.com/IGI-111/wyrm">
  <img src="res/wyrm.png" alt="Wyrm" width="190" height="167"/>
  </a>
</h1>

# Wyrm

Wyrm is a simple remote controlled torrent client.
You can control an instance by using simple HTTP requests.


## Usage
### Seed a new file or folder
`POST /torrent {"path": "/path/to/files"}`

### List all  torrents
`GET /torrent`

### Add a new torrent
`POST /torrent/:infoHash`

`PUT /torrent {"torrent": "magnet link, torrent file path or infoHash"}`

### Delete a torrent
`DELETE /torrent/:infoHash`

### Get information about a torrent
`GET /torrent/:infoHash`

Which returns something like:
```
{
    "name":"Leaves of Grass by Walt Whitman.epub",
    "infoHash":"d2474e86c95b19b8bcfdb92bc12c9d44667cfa36",
    "timeRemaining":0,
    "received":378401,
    "downloaded":362017,
    "uploaded":0,
    "progress":1,
    "length":362017,
    "ratio":0,
    "numPeers":1,
    "path":"/tmp/wyrm/d2474e86c95b19b8bcfdb92bc12c9d44667cfa36"
}
```
