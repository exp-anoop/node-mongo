const fs = require('fs');

var i18n = function() {
    this.language = process.env.LANGUAGE || 'en';
    this.loadFile();
}

i18n.prototype.loadFile = function() {
    var path = `${__dirname}/../i18n/${this.language}.json`;
    if (fs.existsSync(path)) {
        this.messages = require(path);
    }
}

i18n.prototype.set = function(language) {
    this.language = language;
    this.loadFile();
}

i18n.prototype.t = function(text) {
    return this.messages[text] || text;
}

module.exports = i18n;
