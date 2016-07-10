import express from 'express'
import path from 'path'
import graphql from 'graphql'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'
import fs from 'fs'

import http from 'http'
import https from 'https'
import bodyParser from 'body-parser'

// Our custom schema
import schema from './graphql'
import configRoutes from './js/routes'

const privateKey = fs.readFileSync('/home/brianc/CERTS/palaver.key'),
  certificate = fs.readFileSync('/home/brianc/CERTS/fullchain.pem'),
  credentials = {key: privateKey, cert: certificate}

const app = express(),
  router = express.Router(),
  server = http.createServer( app ),
  sserver = https.createServer( credentials, app )

// CORS allows us to fetch images remotely on local-hosted server
//  Without it, "no cross-domain" policy blocks browser access!!
app.use(cors())

app.use( bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// GraphqQL server route
// This "route" treated differently therebecause
app.use('/oscon-test', graphqlHTTP(req => ({
  schema,
  pretty: true,
  // For query/schema debugging turn this on
  graphiql: true
})))

// Generic routers
configRoutes( router, server)
app.use('/', router)
app.use(express.static(path.join(__dirname, '/public')))
//app.use(express.static('/public'));

// Configure mongoose as per http://mongoosejs.com/docs/promises.html
// Use native promises
mongoose.Promise = global.Promise;
// assert.equal(query.exec().constructor, global.Promise);

// Connect mongo database
// mongoose.connect('mongodb://localhost/oscon-test')

// start server
server.listen(2016)
sserver.listen(2017)
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
)
