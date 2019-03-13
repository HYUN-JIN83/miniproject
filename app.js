import express from 'express'
import {router} from './routes/admin'
import path from 'path'
import helmet from 'helmet'
import mongoose from 'mongoose'

const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
    console.log('mongoDB connect')
})
mongoose.connect('mongodb://127.0.0.1:27017/miniproject', { useMongoClient: true })


const app = express()
const port = 3000

app.use(helmet())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('first app')
})

app.use('/admin', router)

app.listen(port, () => {
    console.log('Server Running')
})