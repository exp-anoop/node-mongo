const status = require('./../config/http.status.json');

var response = (req, res, next) => {
    res.message = (message) => {
        if(typeof message === 'string') {
            res.responseMessage = message;
        }
        return res;
    };

    res.return = (message, data) => {
        message =  res.responseMessage|| status[res.statusCode];
        res.send({message, status: res.statusCode, data});
    };
    next();
}

module.exports = { response };
