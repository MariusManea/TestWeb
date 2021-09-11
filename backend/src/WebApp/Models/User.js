const ServerError = require('./ServerError');

class UserBody {
    constructor(body) {
        if (!body.email) {
            throw new ServerError("Email is missing", 400);
        }

        if (!body.password) {
            throw new ServerError("Password is missing", 400);
        }

        if (body.password.length < 4) {
            throw new ServerError("Password is too short!", 400);
        }

        this.email = body.email;
        this.password = body.password;
        this.year = body.year;
    }

    get Email() {
        return this.email;
    }
    get Password() {
        return this.password;
    }
    get Year() {
        return this.year;
    }
}

class UserLoginResponse {
    constructor(token, email, year) {
        this.email = email;
        this.year = year;
        this.token = token;
    }
}

module.exports = {
    UserBody,
    UserLoginResponse
}