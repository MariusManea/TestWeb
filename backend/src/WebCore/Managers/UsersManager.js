const UsersRepository = require('../../Database/PostgreSQL/Repository/UsersRepository.js');
const RegisteredUserDto = require('../DTOs/RegisteredUserDto.js');
const AuthenticatedUserDto = require('../DTOs/AuthenticatedUserDto.js');
const JwtPayloadDto = require('../DTOs/JwtPayloadDto.js');
const ServerError = require('../../WebApp/Models/ServerError.js');

const { hashPassword, comparePlainTextToHashedPassword } = require('../Security/Password');
const { generateTokenAsync } = require('../Security/Jwt');

const authenticateAsync = async (email, plainTextPassword) => {
    const user = await UsersRepository.getUserAsync(email);
    if (!user) {
        throw new ServerError('Utilizatorul nu exista', 404);
    }

    const isGoodPass = await comparePlainTextToHashedPassword(plainTextPassword, user.password);
    if (!isGoodPass) {
        throw new ServerError('Parola incorecta', 403);
    }
    const token = await generateTokenAsync(new JwtPayloadDto(user.email, user.year));
    return new AuthenticatedUserDto(token, user.email, user.year);
}

const registerAsync = async (email, plainTextPwd, year) => {
    const cryptPass = await hashPassword(plainTextPwd);
    const userAdded = await UsersRepository.addAsync(email, cryptPass, year);
    if (!userAdded) {
        throw new ServerError('Inregistrare esuata', 500);
    }

    return new RegisteredUserDto(userAdded.email, userAdded.year);
}

module.exports = {
    authenticateAsync,
    registerAsync
}