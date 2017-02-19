const _ = require('lodash');

var {User} = require('./../../models/user');

/**
 * @api {post} /users Signup user
 * @apiName Signup
 * @apiGroup Users
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {"_id":"58a9b4c77f2ce72c6748c672","email":"anoop.pr@experionglobal.com","name":"Anoop P R"}
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

/**
 * @api {get} /users List all users
 * @apiName listUsers
 * @apiGroup Users
 *
 * @apiHeader {String} x-auth Users unique access-key.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [{"_id":"58a9bd089e75b138939500c6","email":"ajeesh.ag@experionglobal.com","name":"Ajeesh A G"},{"_id":"58a9b4c77f2ce72c6748c672","email":"anoop.pr@experionglobal.com","name":"Anoop P R"}]
 */
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

/**
 * @api {get} /users/:id Get user information
 * @apiName getUser
 * @apiGroup Users
 *
 * @apiParam {Number} id Users unique ID.
 * @apiHeader {String} x-auth Users unique access-key.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {"_id":"58a9b4c77f2ce72c6748c672","email":"anoop.pr@experionglobal.com","name":"Anoop P R"}
 */
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
