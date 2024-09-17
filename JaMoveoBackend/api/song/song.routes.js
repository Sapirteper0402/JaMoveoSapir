import express from 'express'
import { getSongs, getSong, } from './song.controller.js'
import { log } from '../../middlewares/logger.middleware.js'


const router = express.Router()

router.get('/', log, getSongs)
router.get('/:songId', log, getSong)


export const songRoutes = router