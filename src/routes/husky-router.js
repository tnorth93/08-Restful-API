'use strict';

const Husky = require('../model/husky');
const app = require('../lib/router');
const logger = require('logger');

const huskyStorage = [];

const sendStatus = (statusCode, message, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status code because of ${message}`);
  response.writeHead(statusCode);
  response.end();
};

//==================================================================
// HUSKY POST, CREATES A NEW HUSKY
//==================================================================
app.post('api/huskies', (request, response) => {
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }
  if (!request.name) {
    sendStatus(400, 'title not found', response);
    return undefined;
  }
  if (!request.content) {
    sendStatus(400, 'content not found', response);
    return undefined;
  }

  const husky = new Husky(request.body.name, request.body.content);
  huskyStorage.push(husky);
  sendJSON(200, husky, response);
  return undefined;
});

//==================================================================
// HUSKY GET, VIEW A HUSKY
//==================================================================