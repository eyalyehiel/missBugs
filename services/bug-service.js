
const fs = require('fs')
const gBugs = require('../data/bugs.json')

module.exports = {
    query,
    getById,
    remove,
    save
}

const itemsPerPage = 100

function query(filterBy) {
    const { byTitle,page } = filterBy
    const regex = new RegExp(byTitle, 'i')
    let filteredBugs = gBugs.filter((bug) => regex.test(bug.title))

    const startIdx = page * itemsPerPage
    const totalPages = Math.ceil(filteredBugs.length / itemsPerPage)
    filteredBugs = filteredBugs.slice(startIdx, startIdx + itemsPerPage)

    return Promise.resolve({totalPages,filteredBugs})
}

function getById(bugId) {
    const bug = gBugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const idx = gBugs.findIndex(bug => bug._id === bugId)
    gBugs.splice(idx, 1)
    return _saveBugsToFile()
}

function save(bug,loggedinUser) {
    console.log('tst',bug);
    if (bug._id) {
        const idx = gBugs.findIndex(currBug => currBug._id === bug._id)
        if (loggedinUser.isAdmin || gBugs[idx].creator._id === loggedinUser._id){
            gBugs[idx].title = bug.title
            gBugs[idx].desc = bug.desc
            gBugs[idx].severity = bug.severity
        } else {
            return Promise.reject('Not your bug')
        }
    } else {
        bug._id = _makeId()
        gBugs.unshift(bug)
    }
    return _saveBugsToFile().then(() => bug)
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gBugs, null, 2)

        fs.writeFile('data/bugs.json', data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}
