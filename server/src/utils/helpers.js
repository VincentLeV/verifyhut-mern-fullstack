const bcrypt = require("bcrypt")

const encryptPassword = async (password) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    return passwordHash
}

module.exports = {
    encryptPassword
}