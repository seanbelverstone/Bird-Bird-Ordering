const orderController = require("../../controllers/orderController");

export default function(app) {

	app.route("/api/order")
		.post(orderController.create);

	app.route()



}