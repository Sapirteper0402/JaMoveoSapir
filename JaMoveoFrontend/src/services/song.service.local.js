import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const songService = {
    query,
    // save,
    // remove,
    getById,
    // createRobot,
    getDefaultFilter,
    // getFilterFromParams
}

const STORAGE_KEY = 'songs'

_createSongs()


async function query(filterBy) {
    let songs = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        let { txt } = filterBy
        songs = songs.filter(song => 
            song.name.toLowerCase().includes(txt.toLowerCase()) ||
            song.artist.toLowerCase().includes(txt.toLowerCase())); 
    }
    return songs
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}


function getDefaultFilter() {
    return {
        txt: '',
    }
}

function _createSongs() {
    let songs = utilService.loadFromStorage(STORAGE_KEY)
    if (!songs || !songs.length) {
        songs = [
            {
                "_id": "101",
                "name": "Hey Jude",
                "artist": "The Beatles",
                "lyrics": "Hey Jude, don't make it bad...",
                "chords": "C F G Am F C G",
                "image": "https://example.com/hey_jude.jpg"
              },
              {
                "_id": "102",
                "name": "Wonderwall",
                "artist": "Oasis",
                "lyrics": "Today is gonna be the day...",
                "chords": "Em G D A7sus4",
                "image": "https://example.com/wonderwall.jpg"
              },
              {
                "_id": "103",
                "name": "Hallelujah",
                "artist": "Leonard Cohen",
                "lyrics": "Now I've heard there was a secret chord...",
                "chords": "C Am F G E",
                "image": "https://example.com/hallelujah.jpg"
              },
              {
                "_id": "104",
                "name": "Bohemian Rhapsody",
                "artist": "Queen",
                "lyrics": "Is this the real life? Is this just fantasy?",
                "chords": "G Am F C Dm",
                "image": "https://example.com/bohemian_rhapsody.jpg"
              }
        ]
        utilService.saveToStorage(STORAGE_KEY, songs)
    }
}



