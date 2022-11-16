const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const bugService = require('./services/bug-service')
const userService = require('./services/user-service')

app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

//LIST
app.get('/api/bug', (req, res) => {
    const { byTitle, page } = req.query
    const filterBy = {
        byTitle: byTitle || '',
        page: +page || 0
    }
    bugService.query(filterBy)
        .then(bugs => {
            res.send(bugs)
        })
        .catch(() => {
            console.log('failed');
        })
})

//READ
app.get('/api/bug/:bugId', (req, res) => {

    const { bugId } = req.params
    var visitedBugs = JSON.parse(req.cookies.visitedBugs || '[]')

    if (visitedBugs.length < 3) {
        if (!visitedBugs.includes(bugId)) {
            visitedBugs.push(bugId)
            res.cookie('visitedBugs', JSON.stringify(visitedBugs), { maxAge: 7000 })
        }
    } else if (!visitedBugs.includes(bugId)) {
        return res.status(401).send('Test')
    }

    bugService.getById(bugId)
        .then(bug => {
            res.send(bug)
        })
})
//ADD
app.post('/api/bug/', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot add bug')

    const { severity, desc, title, createdAt } = req.body
    const bug = {
        severity,
        desc,
        title,
        createdAt,
        creator: loggedinUser
    }

    bugService.save(bug)
        .then(savedBug => {
            userService.saveBugInUser(loggedinUser._id, savedBug)
            res.send(savedBug)
        })
})

//UPDATE
app.put('/api/bug/:bugId', (req, res) => {

    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot update bug')

    const { severity, title, _id, desc } = req.body

    const bug = {
        _id,
        severity,
        desc,
        title
    }
    bugService.save(bug, loggedinUser)
        .then((savedBug) => {
            res.send(savedBug)
        })
        .catch((err) => {
            console.log(err);
        })
})


//REMOVE
app.delete('/api/bug/:bugId', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot delete bug')
    const { bugId } = req.params
    bugService.remove(bugId)
        .then(() => {
            res.send('Removed!')
        })
})

// LOGIN
app.post('/api/auth/login', (req, res) => {
    userService.checkLogin(req.body)
        .then(user => {
            if (user) {
                const loginToken = userService.getLoginToken(user)
                res.cookie('loginToken', loginToken)
                res.send(user)

            } else {
                res.status(401).send('Invalid login')
            }
        })
})
// SIGNUP
app.post('/api/auth/signup', (req, res) => {
    const { fullname, username, password } = req.body
    const user = {
        fullname,
        username,
        password,
        bugs: [],
    }
    userService.save(user)
        .then(user => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
})

// LOGOUT
app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('logged out')
})
//LIST
app.get('/api/user', (req, res) => {
    userService.query()
        .then(users => {
            res.send(users)
        })
        .catch(() => {
            console.log('failed');
        })
})
//READ USER
app.get('/api/user/:userId', (req, res) => {
    
    const { userId } = req.params
    userService.getById(userId)
        .then(user => {
            res.send(user)
        })
})

//REMOVE USER
app.delete('/api/user/:userId', (req, res) => {
    console.log('remove user');
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot delete user')

    const { userId } = req.params
    userService.remove(userId)
        .then(() => {
            res.send('Removed!')
        })
        .catch((err)=> {
            res.status(401).send(err)
        })
})

app.listen(3030, () => console.log('Server ready at port 3030!'))

