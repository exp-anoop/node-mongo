const expect = require('expect');
const request = require('supertest');

var app = require("./../../app");

describe("GET /api/users", () => {

	it('should be return all users', (done) => {

		request(app)
			.get('/users')
			.expect(200)
			.end(done);
	});

});