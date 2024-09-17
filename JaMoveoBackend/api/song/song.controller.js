import { loggerService } from '../../services/logger.service.js'
import { songService } from './song.service.js'



//List
export async function getSongs(req, res) {
    try {
        loggerService.debug('Getting Songs')
        const filterBy = {
            txt: req.query.txt || '',
        }

        const songs = await songService.query(filterBy)
        res.send(songs)
    } catch (err) {
        loggerService.error(`Had problems getting songs`)
        res.status(400).send({ err: 'Failed to get songs' }) 
    }
}

//GetById
export async function getSong(req, res) {
    var { songId } = req.params
    try {
        const song = await songService.getById(songId)
        res.send(song) 
    } catch (err) {
        res.status(400).send(`Couldn't get song`)
        loggerService.error(`Had problems getting song`)
    }
}