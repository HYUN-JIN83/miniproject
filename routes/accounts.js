import express from 'express'
import UserModel from '../models/UserModel'

const router = express.Router()

router.get('/', (req, res) => res.send('account app'))

router.get('/join', (req, res) => res.render('accounts/join'))

router.get('/login', (req, res) => res.render('accounts/login'))

module.exports = router