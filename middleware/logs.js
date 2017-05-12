const winston = require('winston');
const expressWinston = require('express-winston');

var logger = function() {
    if(process.env.LOGS !== 'true') {
        return (req, res, next) => next();
    }

    return expressWinston.logger({
        transports: [
            new winston.transports.Console({
                json: false,
                colorize: true
            })
        ],
        ignoreRoute: (req, res) => !!req.originalUrl.match(/^\/apidoc\//),
        meta: false,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: true
    });
};

module.exports = { logger };
