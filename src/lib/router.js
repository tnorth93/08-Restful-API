'use strict';

const logger = require('./logger');
const requestParser = require('./request-parser');

const routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
};

const router = module.exports = {};

const logRouteAndCb = (method, route) => {
  logger.log(logger.INFO, `Creating a ${method} handler on the '${route}' route`);
};

router.get = (route, callback) => {
  routeHandlers.GET[route] = callback;
  logRouteAndCb('GET', route);
};

router.put = (route, callback) => {
  routeHandlers.PUT[route] = callback;
  logRouteAndCb('PUT', route);
};

router.post = (route, callback) => {
  routeHandlers.POST[route] = callback;
  logRouteAndCb('POST', route);
};

router.delete = (route, callback) => {
  routeHandlers.DELETE[route] = callback;
  logRouteAndCb('DELETE', route);
};

router.liamFindsRoutesAndExecutesThem = (request, response) => {
  logger.log(logger.INFO, 'Routing a request');
  requestParser.parseAsync(request)
    .then((parsedRequest) => {
      const handler = routeHandlers[parsedRequest.method][parsedRequest.url.pathname];
      logger.log(logger.INFO, 'Found the following handler');
      if (handler) {
        return handler(parsedRequest, response);
      }
      response.writeHead(404);
      response.end();
      return undefined;
    }).catch(() => {
      logger.log(logger.INFO, 'Responding with 400');
      response.writeHead(400, { 'Content-Type': 'text/plain' });
      response.write('Bad Request');
      response.end();
      return undefined;
    });
};
