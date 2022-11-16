export const bugService = {
    query,
    getById,
    remove,
    save,
    getEmptyBug
}

const BASE_URL = `/api/bug/`


function query(filterBy) {
    return axios.get(BASE_URL,{params: filterBy}).then(res => res.data)
}
function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
        .catch(err => {
            return Promise.reject(err)
        })
}
function remove(bugId) {
    return axios.delete(BASE_URL + bugId).then(res => res.data)
}

function save(bug) {
    console.log(bug);
    if (bug._id) {
        return axios.put(BASE_URL + bug._id, bug).then(res => res.data)
    } else {
        console.log(bug);
        bug.createdAt = new Date(Date.now()).toDateString()
        return axios.post(BASE_URL, bug).then((res) => res.data)
    }

}

function getEmptyBug() {
    return {
        "title": "",
        "desc": "",
        "severity": 0,
        "createdAt": null,
    }
}