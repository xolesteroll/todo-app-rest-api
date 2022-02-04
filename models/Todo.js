const {Schema, model, ObjectId} = require('mongoose')

const Todo = new Schema({
    createdAt: {type: String, required: true},
    finishDate: {type: String, required: true},
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
    oldStatus: {type: String, required: true},
    author: {type: ObjectId, ref: 'User'}
})

module.exports = model('Todo', Todo)
