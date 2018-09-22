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
});
