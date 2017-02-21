# Wyrm
Wyrm is a simple remote controlled torrent client daemon.
You can control an instance by using simple HTTP requests.


## Usage
```
  Usage: wyrm [options]

  Options:

    -h, --help          output usage information
    -f, --files [path]  directory to store downloaded files
    -p, --port [port]   port to listen on
```

## API
### Seed a new file or folder
`POST /seed {"path": "/path/to/files"}`

### List all  torrents
`GET /list`

### Add a new torrent
`POST /add/:infoHash`
or
`POST /add {"torrent": "magnet link, torrent file path or infoHash"}`

### Delete a torrent
`DELETE /delete/:infoHash`

### Get information about a torrent
`GET /info/:infoHash`

# Wyrm
Wyrm is a simple remote controlled torrent client daemon.
You can control an instance by using simple HTTP requests.


## Usage
```
  Usage: wyrm [options]

  Options:

    -h, --help          output usage information
    -f, --files [path]  directory to store downloaded files
    -p, --port [port]   port to listen on
```

## API
### Seed a new file or folder
`POST /seed {"path": "/path/to/files"}`

### List all  torrents
`GET /list`

### Add a new torrent
`POST /add/:infoHash`

`POST /add {"torrent": "magnet link, torrent file path or infoHash"}`

### Delete a torrent
`DELETE /delete/:infoHash`

### Get information about a torrent
`GET /info/:infoHash`

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
