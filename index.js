require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todo.routes')
const authRouter = require('./routes/auth.routes')
const userRouter = require('./routes/user.routes')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express()
const cors = require('cors')



const PORT = process.env.PORT || 5000
const dbUrl = process.env.DATABASE_URL

console.log(dbUrl, PORT)

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api/auth', authRouter)
app.use('/api/todos', todoRouter)
app.use('/api/user', userRouter)


const start = async() => {
    try {
        const db = await mongoose.connect(dbUrl)
        app.listen(PORT, () => console.log(`Сервер работает через порт ${PORT}`))
    } catch (e) {
        console.log(e.message)
    }
}

start()
