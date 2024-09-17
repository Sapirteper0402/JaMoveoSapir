import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/'

// const BASE_USER_URL = BASE_URL + 'user/'
const BASE_AUTH_URL = BASE_URL + 'auth/'


export const userService = {
    getEmptyUser,
    getEmptyAdmin,
    login,
    signup,
    logout,
    getLoggedinUser,
}


function getEmptyUser() {
    return {
        username: '',
        password: '',
        instrument: '',
    }
}

function getEmptyAdmin() {
    return {
        username: '',
        password: '',
        instrument: '',
        isAdmin: true
    }
}

async function login(credentials) {
    const { data: user } = await axios.post(BASE_AUTH_URL + 'login', credentials)
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(credentials) {
    const { data: user } = await axios.post(BASE_AUTH_URL + 'signup', credentials)
    return saveLocalUser(user)
}

async function logout() {
    await axios.post(BASE_AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    user = { _id: user._id, username: user.username, instrument: user.instrument, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


