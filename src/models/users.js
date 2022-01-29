const mongoose = require('mongoose')
const { Schema } = mongoose

const validateEmail = email => {
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'email is not valid'],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userSchema)

module.exports = User
