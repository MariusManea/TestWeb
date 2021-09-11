const bcryptjs = require('bcryptjs');

const hashPassword = async (plainTextPwd) => {
    const salt = await bcryptjs.genSalt();
    return await bcryptjs.hash(plainTextPwd, salt);
}

const comparePlainTextToHashedPassword = async (plainTextPwd, hashedPwd) => {
    return await bcryptjs.compare(plainTextPwd, hashedPwd);
}

module.exports = {
    hashPassword,
    comparePlainTextToHashedPassword
}

