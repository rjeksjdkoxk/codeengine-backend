const mongoose = require('mongoose')
const { Schema } = mongoose

const validateEmail = email => {
    const regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email)
}

const departmentSchema = new Schema({
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
    address: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
    dep_name: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
    },
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department
