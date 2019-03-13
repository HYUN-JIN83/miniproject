import express from 'express'
import {router} from './routes/admin'
import path from 'path'
import helmet from 'helmet'

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