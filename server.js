const config = require('config');
const express = require('express');
const http = require('http');
const cors = require('cors');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const routerUsers = require('./routes/usersRoutes');

const server = express();

server.use(cors())
server.use(routerUsers);

server.use((err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send({ ok: false, error: err.message, data: null })
})

const serverHttp = http.createServer(server);
server.use(express.json());

let client = require('redis').createClient(process.env.REDISTOGO_URL);
client.FLUSHALL(() => {
  console.log("flushed all")
})

serverHttp.listen(process.env.PORT, () => {
  const host = serverHttp.address().address;
  const port = serverHttp.address().port;
  console.log('Server run at http://%s:%s', host, port);
});

