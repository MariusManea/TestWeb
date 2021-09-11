const Router = require('express')();

const UsersController = require('./UsersController');

Router.use('/v1/users', UsersController);

module.exports = Router;