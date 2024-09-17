import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})


const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/song/' :
    '//localhost:3030/api/song/'

export const songService = {
    query,
    getById,
    getDefaultFilter,
}


async function query(filterBy) {
    var { data: songs } = await axios.get(BASE_URL, { params: filterBy})
    return songs
}

async function getById(id) {
    const url = BASE_URL + id
    const { data: song } = await axios.get(url)
    return song
}


function getDefaultFilter() {
    return {
        txt: '',
    }
}




