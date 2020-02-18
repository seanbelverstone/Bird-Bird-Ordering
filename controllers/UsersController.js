const db = require("../models");

module.exports = {
  get: (request, response) => {
    db.User.findAll().then((users) => {
      response.json(users);
    });
  }
};