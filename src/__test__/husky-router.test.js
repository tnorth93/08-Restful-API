'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('/api/huskies', () => {
  beforeAll(server.start);
  test('should respond with 200 and new husky', () => {
    return superagent.post('http://localhost:3000/api/huskies')
      .set('Content-Type', 'application/json')
      .send({
        name: 'Dubs',
        content: 'is a good boy',
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.content).toEqual('is a good boy');
        expect(response.body.name).toEqual('Dubs');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
  test('should respond with 400 status code if there is no name', () => {
    return superagent.post('http://localhost:3000/api/huskies')
      .set('Content-Type', 'application/json')
      .send({
        content: 'is a good boy',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
  test('should respond with a json response of all of the huskies in husky storage', () => {
    return superagent.get('http://localhost:3000/api/huskies')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toBeTruthy();
      });
  });
  test('should respond with a json response of a specific husky', () => {
    return superagent.get('http://localhost:3000/api/huskies')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body).toBeTruthy();
      });
  });
  test('should respond with a 404 if the id of a specific husky cannot be found', () => {
    return superagent.get('http://localhost:3000/api/huskies/342432732')
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
  test('respond with 404 if invalid path', () => {
    return superagent.get('http://localhost:3000/apd/huskers')
      .set('Content-Type', 'application/json')
      .send({
        content: 'is a good boy',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });
});
