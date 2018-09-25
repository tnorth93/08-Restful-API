'use strict';

const logger = require('logger');
const Husky = require('../model/husky');
const app = require('../lib/router');

const huskyStorage = [];

const sendStatus = (statusCode, message, response) => {
  logger.log(logger.INFO, `Responding with a ${statusCode} status code because of ${message}`);
  response.writeHead(statusCode);
  response.end();
};

const sendJSON = (statusCode, data, response) => {
  // logger.log(logger.INFO, `Responding with a ${statusCode} status and data`);
  // logger.log(logger.INFO, JSON.stringify(data));
  response.writeHead(statusCode, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(data));
  response.end();
};

// ==================================================================
// HUSKY POST, CREATES A NEW HUSKY
// ==================================================================
app.post('/api/huskies', (request, response) => {
  if (!request.body) {
    sendStatus(400, 'body not found', response);
    return undefined;
  }
  if (!request.body.name) {
    sendStatus(400, 'name not found', response);
    return undefined;
  }
  if (!request.body.content) {
    sendStatus(400, 'content not found', response);
    return undefined;
  }
  const husky = new Husky(request.body.name, request.body.content);
  huskyStorage.push(husky);
  sendJSON(200, husky, response);
  return undefined;
});

// ==================================================================
// HUSKY GET, VIEW A HUSKY
// ==================================================================
app.get('/api/huskies/?id=<uuid>', (request, response) => {
  if (!request.id) {
    sendStatus(404, 'husky not found', response);
    return undefined;
  }
  sendJSON(200, huskyStorage[0], response);
  return undefined;
});

// ==================================================================
// HUSKY GET ALL, RETRIEVE AN ARRAY OF ALL HUSKIES
// ==================================================================
app.get('/api/huskies', (request, response) => {
  sendJSON(200, huskyStorage, response);
  return undefined;
});

// ==================================================================
// HUSKY DELETE, DELETE A HUSKY :(
// ==================================================================
app.delete('/api/huskies/?id=<uuid>', (request, response) => {
  if (!request.id) {
    sendStatus(400, 'husky not found', response);
    return undefined;
  }
  huskyStorage[0] = null;
  return undefined;
});

// ==================================================================
// HUSKY DELETE, DELETE A HUSKY :(
// ==================================================================
app.put('/api/huskies/?id=<uuid>', (request, response) => {
  if (!request.id) {
    sendStatus(400, 'husky not found', response);
    return undefined;
  }
  huskyStorage[0].name = request.body.name;
  huskyStorage[0].content = request.body.content;
  return undefined;
});