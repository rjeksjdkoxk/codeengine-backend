require('dotenv').config()
const jwt = require('jsonwebtoken')

const generateToken = async data => {
    const token = await jwt.sign(data, process.env.JWT_SECRET)

    return token
}

module.exports = {
    generateToken,
}
