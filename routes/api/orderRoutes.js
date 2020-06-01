const orderController = require("../../controllers/orderController");

export default function(app) {

	app.route("/api/order/")
		.post(orderController.create);

	app.route("/api/order/:id")
		.patch(orderController.update)
		.delete(orderController.delete);

	app.route("/api/order/all")
		.get(orderController.get);

}