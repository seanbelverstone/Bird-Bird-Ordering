  const db = require("../models");

module.exports = {
  get: (request, response) => {

    db.Order.findAll({}, 
		).then(orders => {
      response.json(orders);
    });
  },

  create: (request, response) => {
    console.log(request.body);
    db.Order
      .create(request.body)
      .then(newOrder => response.json(newOrder))
      .catch(err => response.status(422).json(err));
  },

  delete: (request, response) => {
    const id = request.params.id
    db.Order
      .destroy({
        where: { id: id }
      })
      .then(deletedOrder => {
          response.json(deletedOrder)
      })
      .catch(err => response.status(422).json(err));
  }
};