const models = require("../models");
const faker = require("faker");
const config = require("../config");
const utility = require("../utility");

class BaseSeeder {
  constructor() {
    this.models = models;
    this.faker = faker;
    this.config = config;
    this.utility = utility;
  }
}

module.exports = BaseSeeder;
