const express = require('express');
var controller = require('./users.controller');

var router = express.Router();

var routes = (authenticate) => {

	router.route("/")
		.post(controller.signup)
		.get(authenticate, controller.listUsers);

	router.route("/me")
		.get(authenticate, controller.me);

	router.route("/:id")
		.get(authenticate, controller.getUser);

	return router;
}

module.exports = { routes, path: 'users'};
