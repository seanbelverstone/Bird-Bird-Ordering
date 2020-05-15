const authController = require("../../controllers/authController");

export default function(app) {
	app.route("/api/login")
	.post(authController.validate)
}
