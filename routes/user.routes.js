const Router = require('express')
const User = require('../models/User')
const router = new Router
const authMiddleware = require('../middleware/auth.middleware')
const userController = require('../controllers/user.controller')

router.post('/set-avatar', authMiddleware,
    async (req, res) => {
        try {
            const response = await userController.setAvatar(req, res)
            console.log(response)
            return res.json(response)
        } catch (e) {
            return res.json(e)
        }
    })

router.post('/test-avatar',
    async (req, res) => {
        try {
            // const {img, id} = req.body
            console.log(req.body)
            return res.json({message: "ok"})
        } catch (e) {
            return res.json(e)
        }
    })

module.exports = router
