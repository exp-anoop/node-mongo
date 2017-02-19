const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const validator = require('validator');

const {dependencies} = require('./app.module');
const {mongoose} = require('./db/mongoose');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var authenticate = (req, res, next) => {
    // console.log("Through authenticate");
    next();
};

if (Array.isArray(dependencies)) {
    for (let mod of dependencies) {
        let modPath = `./modules/${mod}/${mod}.router.js`;

        if (!fs.existsSync(modPath)) {
            throw new Error(`Dependency module '${modPath}' not found`);
        }

        let parts = require(modPath);
        let basepath = parts.base || mod;

        app.use(`/${basepath}`, parts.routes(authenticate));
    }
}

app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT} \n`);
});

module.exports = app;
