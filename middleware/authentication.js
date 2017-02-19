// Auth check middleware for mongoDB
var {User} = require('../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((err) => {
        res.status(401).send();
    });
}

/*
var authenticate = (req, res, next) => {
    next();
}
*/

module.exports = {authenticate};
