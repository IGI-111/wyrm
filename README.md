#Wyrm
Wyrm is a simple remote controlled torrent client.
You can control an instance by using the following simple HTTP requests.

##Adding a torrent
To add a torrent `POST` to `/` with the following body:
```js
{
    "uri":"bc84cb84010074094dba7bb55eebf68c6b3934a2" //a valid magnet, link to a torrent file or infohash
}
```
The response body will contain the infohash of the corresponding torrent.

##Listing torrents
You can get an array of added torrent infohashes by `GET`ing to `/list`

##Getting information
You can get information on an added torrent by `GET`ing to
`/info/[yourTorrentInfoHash]` the response will be in the following form:
```js
{
    "progress":0.16, // a completion ratio between 1 and 0
    "files":["debian-8.2.0-amd64-CD-1.iso"] //an array of paths to the files
}
```

##Getting files
To get the contents of a file, you need to `GET` to
`/get/[yourTorrentInfoHash]/[the path to your file]`
This will open a stream to the file and prioritize the parts accordingly.

##Deleting a torrent
Simply `DELETE` to `/[yourTorrentInfoHash]` to get rid of a torrent.
