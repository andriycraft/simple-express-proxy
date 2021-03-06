const request = require('request');
const express = require('express');
const app = express();

function consolecolors(color) {
    switch (color) {
        case 'warn':
            return '\x1b[33m';
            break;
        case 'info':
            return '\x1b[32m';
            break;
        default:
            throw new Error('Invalid console message level. It must be one of: warn, info')
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
        if (!error) {
            msg('info', req.socket.remoteAddress + ' requested a url ' + url)
            res.end(body)
            return;
        }
        msg('warn', req.socket.remoteAddress + " requested a url:  " + url + " but we cannnot connect to the host")
        res.statusCode = 502
        res.end()
    })
})

app.get('*', function (req, res) { msg('info', req.socket.remoteAddress + ' requested a url ' + url); res.statusCode = 404; res.end(); })

app.listen(80);
msg('info', 'Proxy listening on port 81');
