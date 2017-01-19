'use strict';
const _ = require('lodash');

var {User} = require('./../../models/user');

/**
 * @api {post} /users Signup user
 * @apiName Signup
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
var signup = (req, res) => {

	var body = _.pick(req.body, ['name', 'email', 'password']);

	var user = new User({body});

	user.save().then((doc) => {
		res.send(doc);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

/**
 * @api {post} /users/login Login user
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
var login = (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);

	User.findByCredentials(body.email, body.password).then((user) => {
		return user.generateAuthToken().then((token) => {
			res.header('x-auth', token).send(user);
		});		
	}).catch((err) => {
		res.status(401).send();
	});
};

module.exports = { signup, login };