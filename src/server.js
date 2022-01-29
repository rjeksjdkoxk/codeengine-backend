require('dotenv').config()
const express = require('express')
const app = express()
const connectDb = require('./db/connect-db')
const notFound = require('./middlewares/not-found')
const userRoutes = require('./routes/users')
const departmentRoutes = require('./routes/departments')
const cors = require('cors')
const helmet = require('helmet')

const startServer = async () => {
    await connectDb()
}

startServer()
    .then(value => {
        console.log('db connection success')
        app.listen(process.env.PORT)
    })
    .catch(e => {
        console.log('db connection failure')
        console.log(e.message)
    })

app.use(express.json())

app.use(cors())
app.use(helmet())

app.get('/', (req, res) => {
    res.send('my app')
})

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/departments', departmentRoutes)

app.use(notFound)
