import express from 'express'
import { log } from '../../middlewares/logger.middleware.js'
import { getUser, getUsers } from './user.controller.js'


const router = express.Router()

router.get('/', log, getUsers)
router.get('/:userId', log, getUser)

export const userRoutes = router