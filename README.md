# Scene:History

This software is all about keeping track of high-resolution historical images.
It is also a sample program that implements a number of newer web technologies,
including GraphQL and service workers.  It is written entirely in ES6 (ES2015)

The canonical site incarnate is at https://www.scene-history.org

Link to OSCON presentation slides: https://slides.com/capouch/spa-bootcamp/

## Develop locally

First:

```bash
git clone https://github.com/capouch/oscon17.git
cd oscon17
npm install
```


###Production Version

Transpile the Javascript using Babel:

```bash
npm run build
(You must be root to run the next command)
npm start
```
```bash
http://localhost
```
Note the bundle.js file, which webpack creates and is sent to the client is
*not* kept in the repo and needs to be generated after checkout with
`npm run build`. After changing the client-side codebase, `npm run build` must be
executed to freshen up the bundle


###Development Version

Run with webpack, hot reload is included so there is no need for refreshing the client:

```bash
npm run serve
```
```bash
http://127.0.0.1:8080
```


### Docker
Run inside a docker container:

```
docker run -p 3000:80 -v "$PWD"/public:/usr/local/apache2/htdocs/ httpd:2.4
```

Visit `http://<YOUR_DOCKER_MACHINE_IP>:3000`

Run app in server mode:

```
npm start
```
