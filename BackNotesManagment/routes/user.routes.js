const router = require('express').Router();
const userController = require("../controller/user.controller");

router.route("/register").post(userController.registerUser)
router.route("/login").post(userController.loginUser)

module.exports = router;