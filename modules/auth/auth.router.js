'use strict';

const express = require('express');
var controller = require('./auth.controller');

var router = express.Router();

var routes = (authenticate) => {

	router.route("/")
		.post(controller.login)
		.delete(controller.logout);

	return router;
}

module.exports = { routes };