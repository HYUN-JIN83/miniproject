import express from 'express'
import {router} from './routes/admin'
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('first app')
})

app.use('/admin', router)

app.listen(port, () => {
    console.log('Server Running')
})