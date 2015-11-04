'use strict';

var req = require('request');
var bunyan = require('bunyan');
var bunyanFormatter = require('bunyan-format');
var formatOut = bunyanFormatter({ outputMode: 'short' });
var log = bunyan.createLogger({name: 'hack-box', stream: formatOut});

var apiUrl = 'http://ci-hemlock.glamour.com/hack-box';

module.exports = function(request, reply) {
    var options = {
        uri: apiUrl,
        json: request.payload,
        headers: {
            'Accept' : 'application/json;ver=1.0'
        }
    };
    var payload = request.payload;
    payload.because = payload.because ? payload.because.replace(/(other)[.]+/g, '$1') : payload.because;
    payload.better = payload.better ? payload.better.replace(/(other)[.]+/g, '$1') : payload.better;

    log.info('Submitting payload\n', payload);

    req.post(options, function(error, response, body) {
        log.info('Got a response of', response.statusCode);
    });
    reply.view('thank-you');
};
