import express from 'express';
import path from 'path'
import graphql from 'graphql';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import http from 'http';
import bodyParser from 'body-parser';

// Our custom schema
import schema from './graphql';

var app = express(),
router = express.Router(),
routes = require('./js/routes.js'),
server = http.createServer( app );

app.use( bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GraphqQL server route
app.use('/oscon-test', graphqlHTTP(req => ({
  schema,
  pretty: true,
  // For query/schema debugging turn this on
  graphiql: true
})));

// Generic routers
routes.configRoutes( router, server);
app.use('/', router);
app.use(express.static(path.join(__dirname, '/public')))
//app.use(express.static('/public'));

// Connect mongo database
mongoose.connect('mongodb://localhost/oscon-test');

// start server
server.listen(8111);
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
);
