import { loggerService } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js';
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const songService = {
    query,
    getById,
}

// var songs = _readJsonFile("./data/song.json");
const collectionName = 'song'

async function query(filterBy) {

  try {
    const criteria = _buildCriteria(filterBy)

    const collection = await dbService.getCollection(collectionName)
    const songCursor = await collection.find(criteria)

    const songs = songCursor.toArray()
    return songs

  } catch (err) {
    loggerService.error(`Had problems getting songs...`)
    throw err
  }
}


async function getById(songId) {
  try {
      const collection = await dbService.getCollection(collectionName)
      const song = await collection.findOne({ _id: new ObjectId(songId) })
      if (!song) throw `Couldn't find song with _id ${songId}`
      return song
  } catch (err) {
      loggerService.error(`while finding song ${songId}`, err)
      throw err
  }
}


function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [{
            name: txtCriteria
        },
        {
            artist: txtCriteria
        }
    ]
  }
  return criteria
}




// function _readJsonFile(path) {
//   const str = fs.readFileSync(path, "utf8");
//   const json = JSON.parse(str);
//   return json;
// }

// function _saveBugsToFile(path) {
//   return new Promise((resolve, reject) => {
//     const data = JSON.stringify(bugs, null, 2);
//     fs.writeFile(path, data, (err) => {
//       if (err) return reject(err);
//       resolve();
//     });
//   });
// }

