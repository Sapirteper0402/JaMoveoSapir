import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'
import { loggerService } from '../../services/logger.service.js'

const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')

export const authService = {
    getLoginToken,
    validateToken,
    login,
    signup
}


function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function validateToken(token) {
    try {
        const json = cryptr.decrypt(token)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

async function login(username, password) {
    const user = await userService.getByUsername(username)
    if (!user) throw 'Unkown username'
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw 'Invalid username or password'

    const miniUser = {
        _id: user._id,
        username: user.username,
        instrument: user.instrument,
        isAdmin: user.isAdmin,
    }
    return miniUser
}

async function signup({ username, password, instrument, isAdmin = false }) {
    
    loggerService.debug(`auth.service - signup with username: ${username}, instrument: ${instrument}`)
    if (!username || !password || !instrument) throw 'Missing required signup information'
    
    const userExist = await userService.getByUsername(username)
    if (userExist) throw 'Username already taken'
    
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.save({ username, password: hash, instrument, isAdmin })
}



