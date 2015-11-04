'use strict';

var Hapi = require('hapi');
var Handlebars = require('handlebars');
var path = require('path');
var routes = require('./routes');

var server = new Hapi.Server();
server.connection({ port: 8000 });

server.views({
    engines: {
      // Handlebars is the engine responsible for rendering templates for html
        html : Handlebars,
        hbs : Handlebars
    },
    path: path.join(__dirname, '../templates'),
    partialsPath: path.join(__dirname, '../templates/partials'),
    defaultExtension: 'hbs'
});

server.route(routes);


server.start(function () {
    console.log('Server running at:', server.info.uri);
});
