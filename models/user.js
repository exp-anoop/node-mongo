const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

var UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true,
		validate: {
	      validator: validator.isEmail,
	      message: '{VALUE} is not a valid email'
	    }
	},
	password: {
		type: String,
	    required: true,
	    minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function() {
	var user  = this;

	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email', 'name']);
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'ss1232nhnnbjhjvjvvjvcfx76').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByCredentials = function(email, password) {
	var User = this;

	return User.findOne({email}).then((user) => {
		if(!user) return Promise.reject();

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password).then((result) => {
				if(result) resolve(user);
				else reject();
			});
		});
	});
}


UserSchema.pre('save', function(next) {
	var user = this;

	if(user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			
			if(err) throw Error(err);

			bcrypt.hash(user.password, salt, (err, hash) => {
				if(err) throw Error(err);

				user.password = hash;
				next();
			});
		});
	}
});

var User = mongoose.model("User", UserSchema);
module.exports = {User};
