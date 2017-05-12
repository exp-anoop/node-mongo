// ========================
// Get the packages we need
// ========================
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {dependencies} = require('./app.module');
var {mongoose} = require('./db/mongoose');
var {authenticate} = require('./middleware/authentication');
var {logger} = require('./middleware/logs');
var {response} = require('./middleware/response');
var i18n = require('./middleware/i18n');

// =======================
// Configuration
// =======================
const PORT = process.env.PORT || 3000;

var app = express();
app.set('i18n', new i18n());
app.use(helmet());
app.use(logger());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(response);

// =======================
// Dynamic route loading
// =======================
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

app.get('*', (req, res) => res.status(404).return());

// =======================
// Start the server
// =======================
app.listen(PORT);

module.exports = app;
