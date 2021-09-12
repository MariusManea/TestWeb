const express = require('express');

const UsersManager = require('../../WebCore/Managers/UsersManager.js');
const UsersRepository = require('../../Database/PostgreSQL/Repository/UsersRepository.js');
const ServerError = require('../Models/ServerError.js');
const authorizeAndExtractTokenAsync = require('../Filters/JWTFilter.js').authorizeAndExtractTokenAsync;

const {
    UserBody,
    UserLoginResponse
} = require('../Models/User');
const ResponseFilter = require('../Filters/ResponseFilter.js');

const Router = express.Router();

Router.post('/register', async(req, res) => {
    const userBody = new UserBody(req.body);
    try {
        const user = await UsersManager.registerAsync(userBody.Email, userBody.Password, userBody.Year);
        ResponseFilter.setResponseDetails(res, 200, user);
    } catch (e) {
        ResponseFilter.setResponseDetails(res, 400, null);
    }
});

Router.post('/login', async(req, res) => {
    try {
        const userBody = new UserBody(req.body);
        const userDto = await UsersManager.authenticateAsync(userBody.Email, userBody.Password);
        const user = new UserLoginResponse(userDto.token, userDto.email, userDto.year);

        ResponseFilter.setResponseDetails(res, 200, user);
    } catch (e) {
        ResponseFilter.setResponseDetails(res, 404, e.message);
    }
});

Router.get('/', authorizeAndExtractTokenAsync, async (req, res) => {
    const users = await UsersRepository.getAllAsync();

    ResponseFilter.setResponseDetails(res, 200, users);
})


module.exports = Router;