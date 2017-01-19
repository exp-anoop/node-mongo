'use strict';

const express = require('express');
var controller = require('./users.controller');

var router = express.Router();

var routes = (authenticate) => {

	router.route("/")
		.post(controller.signup);

	router.route("/login")
		.post(controller.login);

	return router;
}

module.exports = { routes };