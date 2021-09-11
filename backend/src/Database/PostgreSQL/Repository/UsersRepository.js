const {
    queryAsync
} = require('..');

const getAllAsync = async() => {
    console.info('Getting all users');
    return await queryAsync('SELECT u.email, u.year FROM users u');
}

const addAsync = async(email, password, year) => {
    console.info('Adding user');

    const user = await queryAsync('INSERT INTO users (email, password, year) VALUES ($1, $2, $3) RETURNING  *', [email, password, year]);
    return user[0];
}

const getUserAsync = async(email) => {
    console.info('Getting user');

    const user = await queryAsync('SELECT u.email, u.password FROM users u WHERE u.email = $1', [email]);
    return user[0];
}

module.exports = {
    getAllAsync,
    addAsync,
    getUserAsync
}