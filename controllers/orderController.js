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

  update: (request, response) => {
    console.log(`Completed variable: ${request.body.completed} at ID: ${request.body.id}`)
    db.Order
      .findOne({where: {id: request.body.id}})
      .then(
        db.Order.update({
        ...(request.body.completed ? { completed: request.body.completed } : {}),
		...(request.body.pickupDateTime ? { pickupDateTime: request.body.pickupDateTime } : {})
      }, { where: {
        id: request.body.id
      }}))
      .then(updatedOrder => {
        response.json(updatedOrder);
      })
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