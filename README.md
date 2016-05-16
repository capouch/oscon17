# SPA for OSCON 2016

## Develop locally

###Production Version

Transpile the Javascript using Babel and watch for changes:

```bash
git clone https://github.com/capouch/oscon16.git
cd oscon16
npm install
npm run build
npm start
```
```bash
localhost:2016
```
Note the bundled file is *not* kept in the repo and needs to be generated after
checkout with `npm run build`. Also after any change, `npm run build` has to be
executed to get the newest version of the code


Run with webpack, and have hot reload:

```bash
npm run serve
localhost:8080
```

Run inside a docker container:

```
docker run -p 3000:80 -v "$PWD"/public:/usr/local/apache2/htdocs/ httpd:2.4
```

Visit `http://<YOUR_DOCKER_MACHINE_IP>:3000`

Run app in server mode:

```
npm start
```
