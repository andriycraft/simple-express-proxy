const request = require('request');
const express = require('express');
const app = express();

function consolecolors(color) {
    switch (color) {
        case 'err':
            return '\x1b[31m';
            break;
        case 'warn':
            return '\x1b[33m';
            break;
        case 'info':
            return '\x1b[32m';
            break;
        case 'debug':
            return '\x1b[1m'
            break;
        default:
            throw new Error('Invalid console message level. It must be one of: err, warn, info, debug')
            break;
    }
}
function msg(color, message) {
    console.log(consolecolors(color) + message)
}

app.get('/', function (req, res) {
    var url = req.query.url
    if (!url) { res.statusCode = 400 }
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            msg('info', req.socket.remoteAddress + ' requested a url ' + url)
            res.end(body)
        }
        else {
            msg('warn', req.socket.remoteAddress + " requested a url:  " + url + " but we cannno't connect to the host")
            res.statusCode = 502
            res.end()
        }
    })
})

app.get('*', function (req, res) {
    res.statusCode = 404
    res.end()
})

app.listen(81);
msg('info', 'Proxy listening on port 81');
