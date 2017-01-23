var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://anoop:heyitsme@ds117859.mlab.com:17859/seed-application');

module.exports = {mongoose};
