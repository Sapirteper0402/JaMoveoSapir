import { dbService } from '../../services/db.service.js'
import { loggerService } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

const collectionName = 'user'

export const userService = {
    query,
    getById,
    getByUsername,
    save
};


async function query() {
  try {
    const collection = await dbService.getCollection(collectionName)
    const users = await collection.find().toArray()

    const sanitizedUsers = users.map(user => {
      delete user.password
      return user
    })
    return sanitizedUsers
  } catch (err) {
      loggerService.error(`Had problems getting users...`, err)
      throw err
  }
}


async function getById(userId) {
  try {
      const collection = await dbService.getCollection(collectionName)
      const user = await collection.findOne({ _id: new ObjectId(userId) })
      delete user.password
      return user
  } catch (err) {
      loggerService.error(`while finding user by id: ${userId}`, err)
      throw err
  }
}

async function getByUsername(username) {
  try {
      const collection = await dbService.getCollection(collectionName)
      const user = await collection.findOne({ username })
      return user
  } catch (err) {
      loggerService.error(`while finding user by username: ${username}`, err)
      throw err
  }
}


// Add User
async function save(user) {
  try {
        const userToSave = {
          username: user.username,
          password: user.password,
          instrument: user.instrument,
          isAdmin: user.isAdmin || false,
        }

        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(userToSave)
        return userToSave
  } catch (err) {
    loggerService.error('cannot add user', err)
    throw err
  }
}

