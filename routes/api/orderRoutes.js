const orderController = require("../../controllers/orderController");

export default function(app) {

	app.route("/api/order/")
		.post(orderController.create);

	app.route("/api/order/:id")
		.get(orderController.get)
		.delete(orderController.delete);

	app.route("/api/order/all")
		.get(orderController.get)

}