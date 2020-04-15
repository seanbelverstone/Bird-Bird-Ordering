  const db = require("../models");

module.exports = {
  get: (request, response) => {
    console.log(request.user)
	db.Order.findAll({}, 
		).then((orders) => {
      response.json(orders);
    });
  },

  create: (request, response) => {
    db.Order
      .create(request.body)
      .then(dbModel => response.json(dbModel))
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