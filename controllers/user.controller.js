const uuid = require('uuid')
const path = require('path')

class UserController {
    async setAvatar(req, res) {
        try {
            const {id} = req.body
            const {img} = req.files
            let fileName = await uuid.v4() + ".jpg"
            console.log(id)
            await img.mv(path.resolve(__dirname, '..', `static/avatars`, fileName))
            return {
                message: "ok"
            }
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController()
