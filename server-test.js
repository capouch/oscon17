import express from 'express'
import path from 'path'
import morgan from 'morgan'
import graphql from 'graphql'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'
import fs from 'fs'
import compression from 'compression'

import http from 'http'
import https from 'https'
import bodyParser from 'body-parser'

// Our custom schema
import mySchema from './graphql'
// Set server-side routes
import configRoutes from './js/server-routes'

const dbName = 'oscon-test'

const privateKey = fs.readFileSync('/home/brianc/CERTS/shPriv.pem'),
  certificate = fs.readFileSync('/home/brianc/CERTS/shFullChain.pem'),
  credentials = {key: privateKey, cert: certificate}

const app = express(),
  router = express.Router(),

// Comment this out to quell logging
// app.use(morgan('combined'))

// No non-SSL service in this configuration
server = http.createServer( app )

// Redirect all HTTP requests to secure site version
/*
http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
  }).listen(80);
  */

// Allow HTTP during development so we can use 'localhost' for PWA
// const server = http.createServer(app)

// Note that at present this only works for www.scene-history_org
const sserver = https.createServer( credentials, app )

// CORS allows us to fetch images on local-hosted server
//  The Wikipedia page is really good
app.use(cors())

// Compress outbound service
app.use(compression())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// GraphqQL server route
// This "route" is special API call to GraphQL interface
app.use('/graphql' ,graphqlHTTP({
  schema: mySchema,
  graphiql: true
}));

// Generic routers
configRoutes(router, server)
app.use('/', router)

// Set up path
app.use(express.static(path.join(__dirname, '/public')))

// Configure mongoose as per http://mongoosejs.com/docs/promises.html
// Use native promises
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

// Connect to mongo database
mongoose.connect('mongodb://localhost/' + dbName)

// start HTTP server
server.listen(8080)

// Start HTTPS server
sserver.listen(4443)
console.log(
  'Express server listening on port %d in %s mode',
  sserver.address().port, app.settings.env
)
