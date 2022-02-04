require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todo.routes')
const authRouter = require('./routes/auth.routes')
const app = express()
const cors = require('cors')


const PORT = process.env.PORT
const dbUrl = process.env.DATABASE_URL

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)


const start = async() => {
    try {
        const db = await mongoose.connect(dbUrl)
        app.listen(PORT, () => console.log(`Сервер работает через порт ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}

start()
