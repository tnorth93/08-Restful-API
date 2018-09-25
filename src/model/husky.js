'use strict';

const uuid = require('uuid/v1');

class Husky {
  constructor(name, content) {
    this.id = uuid();
    this.timestamp = new Date();

    this.name = name;
    this.content = content;
  }
}

module.exports = Husky;
