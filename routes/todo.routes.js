const Router = require('express')
const router = new Router
const TodosController = require('../controllers/todo.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/add-todo', authMiddleware,
    async (req, res) => {
        try {
            const response = await TodosController.addTodo(req, res)
            return res.status(200).json(response)
        } catch (e) {
            return res.status(400).json(e)
        }
    })

router.get('/my-todos/:id', authMiddleware,
    async (req, res) => {
        try {
            const response = await TodosController.getMyTodos(req, res)
            if (response.success) {
                return res.status(200).json(response)
            } else {
                return res.status(400).json(response)
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    })

router.post('/change-status', authMiddleware,
    async (req, res) => {
        try {
            const todo = await TodosController.changeTodoStatus(req, res)
            if(todo) {
                return res.status(200).json(todo)
            } else {
                return res.status(401).json({succes: false, message: 'Server error'})
            }
        } catch (e) {
            return res.status(400).json(e)
        }
    })

module.exports = router


