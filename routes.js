module.exports = function(web, bt, downloadPath){
    // Adding a torrent
    web.post('/', function(req, res){
        var uri = req.body.uri;
        bt.add(uri, {path: downloadPath}, function(torrent){
            res.send(torrent.infoHash);
            console.log("Added torrent " + torrent.infoHash +
                    " at " + downloadPath + '/' +torrent.path);
        });
    });
    // Removing a torrent
    web.delete('/:infoHash', function(req, res){
        var infoHash = req.params.infoHash;
        bt.remove(infoHash);
        console.log("Deleted " + infoHash);
    });
    // Getting torrent info
    web.get('/info/:infoHash', function(req, res){
        var torrent = bt.get(req.params.infoHash);
        var torrentSize = torrent.files.reduce(function(total, file){
            return total + parseInt(file.length);
        }, 0);
        var fileList = torrent.files.map(function(f){
            return f.path;
        });

        res.json({
            progress: torrent.downloaded / torrentSize,
            files: fileList
        });
    });

    // Getting a file
    web.get('/get/:infoHash/:path(*)', function(req, res){
        var torrent = bt.get(req.params.infoHash);
        var file = torrent.files.find(function(f){
            return f.path === req.params.path;
        });
        res.set('Content-Length', file.length);
        file.createReadStream().pipe(res);
        console.log("Sending " + file.path);
    });
};
