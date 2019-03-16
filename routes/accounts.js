import express from 'express'
import UserModel from '../models/UserModel'
import passwordHash from '../libs/passwordHash'

const router = express.Router()

router.get('/', (req, res) => res.send('account app'))

router.get('/join', (req, res) => res.render('accounts/join'))

router.post('/join', (req, res) => {
    const User = new UserModel({
        username : req.body.username,
        password : passwordHash(req.body.password),
        displayname : req.body.displayname
    })
    User.save((err) => {
        res.send('<script>alert("회원가입 성공"); \
        location.href="/accounts/login";</script>')
    })
})

router.get('/login', (req, res) => res.render('accounts/login'))

module.exports = router