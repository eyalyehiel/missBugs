const KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'
const BASE_URL = '/api/user/'

// signup({fullname: 'Muki Ba', username: 'muki', password: 'secret'})

export const userService = {
    getLoggedInUser,
    login,
    logout,
    signup,
    getById,
    query,
    remove
}
//list
function query() {
    return axios.get(BASE_URL).then(res => res.data)
}
//read
function getById(userId) {
    return axios.get(BASE_URL + userId)
        .then(res => res.data)
        .catch(err => {
            return Promise.reject(err)
        })
}
//remove
function remove(userId) {
    console.log('remove user');
    return axios.delete(BASE_URL + userId).then(res => res.data)
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}


function login({ username, password }) {
    return axios.post('/api/auth/login', { username, password })
        .then(res => res.data)
        .then(user => {
            return setLoggedinUser(user)
        })
        .catch(()=> {
            return Promise.reject()
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname }
    return axios.post('/api/auth/signup', user)
        .then(res => res.data)
        .then(user => {
            return setLoggedinUser(user)
        })
}


function logout() {
    return axios.post('/api/auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
}

function setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname , isAdmin: user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(userToSave))
    return userToSave
}