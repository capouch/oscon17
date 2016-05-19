import express from 'express'
import path from 'path'
import graphql from 'graphql'
import graphqlHTTP from 'express-graphql'
import mongoose from 'mongoose'
import cors from 'cors'

import http from 'http'
import bodyParser from 'body-parser'

// Our custom schema
import schema from './graphql'
import configRoutes from './js/routes'

const app = express(),
  router = express.Router(),
  server = http.createServer( app )

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

// Connect mongo database
mongoose.connect('mongodb://localhost/oscon-test')

// start server
server.listen(2016)
console.log(
  'Express server listening on port %d in %s mode',
  server.address().port, app.settings.env
)
