# SPA for OSCON 2016


## Develop locally

Transpile the Javascript using Babel and watch for changes:

```bash
git clone https://github.com/capouch/oscon16.git
cd oscon16
npm install
npm run watch
```

Run with webpack:

```bash
npm run serve
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
