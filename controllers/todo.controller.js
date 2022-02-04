const Todo = require('../models/Todo')

class TodoController {
    async addTodo(req, res) {
        try {
            const {title, description, finishDate} = req.body
            const date = Date.now()
            const todo = new Todo({
                title,
                description,
                createdAt: date,
                finishDate,
                author: req.user.id,
                status: "active",
                oldStatus: "active"
            })
            await todo.save()
            return {
                message: "Your todo was added successfully",
                todo
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    }

    async getMyTodos(req, res) {
        try {
            const id = req.params.id
            const myTodos = await Todo.find({author: id})
            if (myTodos) {
                return {
                    success: true,
                    todos: myTodos
                }
            } else {
                return {
                    success: false,
                    todos: null
                }
            }

        } catch (e) {
            return res.status(400).json(e)
        }

    }

    async changeTodoStatus(req, res) {
        try {
            const {todoId, oldStatus, newStatus} = req.body
            const todo = await Todo.findByIdAndUpdate(todoId, {
                oldStatus: oldStatus,
                status: newStatus
            }, {
                new: true
            })

            return todo

        } catch (e) {
            return res.status(400).json(e)
        }
    }
}

module.exports = new TodoController()


