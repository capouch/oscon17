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

const dbName = 'wchs'

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.white-county-history.org/privkey.pem'),
certificate = fs.readFileSync('/etc/letsencrypt/live/www.white-county-history.org/fullchain.pem'),
credentials = {key: privateKey, cert: certificate}

const app = express(),
  router = express.Router()
// app.use(morgan('combined'))

// We want ONLY HTTPS here for service worker
// let server = http.createServer( app )

// Redirect all HTTP requests to secure server
http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
  }).listen(80);

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
configRoutes(router, sserver)
app.use('/', router)

// Set up path
app.use(express.static(path.join(__dirname, '/public')))

// Configure mongoose as per http://mongoosejs.com/docs/promises.html
// Use native promises
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

// Connect to mongo database
mongoose.connect('mongodb://localhost/' + dbName)

// start server
// server.listen(80)
sserver.listen(443)
console.log(
  'Express server listening on port %d in %s mode',
  sserver.address().port, app.settings.env
)
