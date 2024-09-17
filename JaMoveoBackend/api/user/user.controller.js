import { userService } from './user.service.js'
import { loggerService } from '../../services/logger.service.js'

//List
export async function getUsers(req, res) {
    try {
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        loggerService.error(`Had problems getting users`)
        res.status(400).send(`Couldn't get users`) 
    }
}

//GetById
export async function getUser(req, res) {
    var { userId } = req.params

    try {
        const user = await userService.getById(userId)
        res.send(user) 
    } catch (err) {
        loggerService.error(`Had problems getting user`)
        res.status(400).send(`Couldn't get user`)
    }
}

