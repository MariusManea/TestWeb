class AuthenticatedUserDto {
    constructor (token, email, year) {
        this.token = token;
        this.email = email;
        this.year = year;
    }

    get Token() {
        return this.token;
    }

    get Email() {
        return this.email;
    }

    get Year() {
        return this.year;
    }
}

module.exports = AuthenticatedUserDto;