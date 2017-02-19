const _ = require('lodash');
var { User } = require('./../../models/user');

var login = (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        }).catch(() => {
            res.status(401).send();
        });
    }).catch((err) => {
        res.status(401).send();
    });
}

var logout = (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch(() => {
        res.status(400).send();
    });
}

module.exports = { login, logout };
