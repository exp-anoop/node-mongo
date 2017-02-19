const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const validator = require('validator');

const {dependencies} = require('./app.module');
const {mongoose} = require('./db/mongoose');
var {authenticate} = require('./middleware/authentication');
var {cors} = require('./middleware/cors');

const PORT = process.env.PORT || 3000;

var app = express();

app.disable('x-powered-by');
app.enable('trust proxy');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors);

if (Array.isArray(dependencies)) {
    for (let mod of dependencies) {
        let modPath = `./modules/${mod}/${mod}.router.js`;

        if (!fs.existsSync(modPath)) {
            throw new Error(`Dependency module '${modPath}' not found`);
        }

        let parts = require(modPath);
        let basepath = parts.path || mod;

        app.use(`/${basepath}`, parts.routes(authenticate));
    }
}

app.listen(PORT, () => {
    console.log(`App listening to port: ${PORT} \n`);
});

module.exports = app;
