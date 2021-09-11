class RegisteredUserDto {
    constructor (email, year) {
        this.email = email;
        this.year = year;
    }

    get Email() {
        return this.email;
    }

    get Year() {
        return this.year;
    }
}

module.exports = RegisteredUserDto;