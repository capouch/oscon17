import express from 'express'
import path from 'path'
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
import configRoutes from './js/server-routes'

const dbName = 'oscon-test'

const privateKey = fs.readFileSync('/home/brianc/CERTS/scene-history_org.key'),
  certificate = fs.readFileSync('/home/brianc/CERTS/www_scene-history_org_combined.crt'),
  credentials = {key: privateKey, cert: certificate}

const app = express(),
  router = express.Router()
  // server = http.createServer( app ),
http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
  }).listen(80);

const sserver = https.createServer( credentials, app )

// CORS allows us to fetch images remotely on local-hosted server
//  Without it, "no cross-domain" policy blocks browser access!!
app.use(cors())

// Compress outbound service
app.use(compression())

app.use( bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// GraphqQL server route
// This "route" is special
app.use('/graphql' ,graphqlHTTP({
  schema: mySchema,
  graphiql: true
}));

// Generic routers
configRoutes( router, sserver)
app.use('/', router)
app.use(express.static(path.join(__dirname, '/public')))
//app.use(express.static('/public'));

// Configure mongoose as per http://mongoosejs.com/docs/promises.html
// Use native promises
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

// Connect mongo database
mongoose.connect('mongodb://localhost/' + dbName)

// start server
// server.listen(2016)
sserver.listen(443)
console.log(
  'Express server listening on port %d in %s mode',
  sserver.address().port, app.settings.env
)
