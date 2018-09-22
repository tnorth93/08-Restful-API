'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
require(../)

const app = http.createServer(router. liamFindsRoutesAndExecutesThem;

// ======================================================

const server = module.exports = {};

server.start = (port) => {
  return app.listen(port, () => {
    logger.log(logger.INFO, `Server is on PORT: ${port}`);
  });
};
