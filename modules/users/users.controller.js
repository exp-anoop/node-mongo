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

	var user = new User(body);

	user.save().then((user) => {
		res.send(user);
	}).catch((e) => {
		res.status(400).send(e);
	});
};

var listUsers = (req, res) => {
	User.find().then((users) => {
		if(!users) {
			res.status(204).send();
		}
		res.send(users);
	}).catch((e) => {
		res.status(400).send(e);
	});
}

var getUser = (req, res) => {
	User.findOne({_id: req.params.id}).then((user) => {
		if(!user) {
			res.status(204).send();
		}
		res.send(user);
	}).catch((e) => {
		res.status(400).send(e);
	})
}

module.exports = { signup, listUsers, getUser };
