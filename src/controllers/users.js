require('dotenv').config()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const utils = require('../utils')

const register = async (req, res) => {
    const { name, email, password } = req.body

    console.log(req.body)

    if (!name || !email || !password) {
        return res.status(400).json({
            status: 0,
            msg: 'provide all the details',
        })
    }

    try {
        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, +process.env.BCRYPT_SALT),
        })
    } catch (e) {
        return res.status(400).json({
            status: 0,
            msg: e.message,
        })
    }

    res.json({
        status: 1,
        msg: 'user registered success',
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            status: 0,
            msg: 'provide all the details',
        })
    }

    try {
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                status: 0,
                msg: 'invalid login creds',
            })
        }

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) {
            return res.status(401).json({
                status: 0,
                msg: 'invalid login creds',
            })
        }

        const token = await utils.generateToken({ _id: user._id })
        res.json({
            status: 1,
            msg: 'user login success',
            token,
        })
    } catch (e) {
        return res.status(400).json({
            status: 0,
            msg: e.message,
        })
    }
}

module.exports = {
    register,
    login,
}
