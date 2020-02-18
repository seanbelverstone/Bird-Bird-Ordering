const router = require("express").Router();
const UsersController = require("../../controllers/UsersController");

router.route("/")
  .get(UsersController.get);

module.exports = router;