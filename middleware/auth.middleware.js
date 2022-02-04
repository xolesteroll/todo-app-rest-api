const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    const secretKey = process.env.JWT_SECRET_KEY
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(401).json({error: 'Auth error'})
        }
        const decodedToken = await jwt.verify(token, secretKey)
        req.user = decodedToken
        return next()
    } catch (e) {
        return {
            error: e.message
        }
    }
}
