'use strict';

var handlers = require('./handlers');

module.exports = [
    {
        method: 'POST',
        path: '/thanks-4-your-2-cents',
        handler: handlers.takePulse
    },
    {
      method: 'GET',
      path: '/',
      handler: handlers.main
    },
    {
        method: 'GET',
        path: '/static/{param*}',
        handler: handlers.static
    }
];
