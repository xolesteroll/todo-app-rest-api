const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = new Router
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/registration',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password should be longer than 3 and less than 12 symbols').isLength({min: 3, max: 12})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({error: "Could not validate entered credentials"})
            }

            console.log(req.body)
            const {email, password, firstName, lastName} = req.body

            const candidate = await User.findOne({email})

            if (candidate) {
                return res.status(400).json({error: "This email was already registered"})
            }
            const hashedPassword = await bcrypt.hash(password, 8)
            const user = new User({
                email,
                password: hashedPassword,
                firstName,
                lastName
            })
            await user.save()
            const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"})
            return res.json({
                message: "User was registered",
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

            })

        } catch (e) {
            console.log(e)
            return res.send({error: "Server Error"})
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(404).json({error: "User not found"})
            }
            const isPassValid = await bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({error: "Entered password is incorrect"})
            }
            const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        } catch (e) {
            console.log(e)
             return res.send(e)
        }
    })


router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user.id)
            const user = await User.findOne({_id: req.user.id})
            const token = await jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn: "24h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            })
        } catch (e) {
            console.log(e)
            return res.send({error: "Server Error"})
        }
    })

module.exports = router
