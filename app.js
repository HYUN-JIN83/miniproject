import express from 'express'
import admin from './routes/admin'
import accounts from './routes/accounts'
import auth from './routes/auth'
import home from './routes/home'
import chat from './routes/chat'
import path from 'path'
import helmet from 'helmet'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'       // flash 메시지 관련
import passport from 'passport'         // 로그인 관련
import session from 'express-session' 
import mongoose from 'mongoose'
mongoose.Promise = global.Promise       // 에러처리
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
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// upload path
app.use('/uploads', express.static('uploads'))

//session 관련 셋팅
app.use(session({
    secret: 'hjkimt',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
}))
 
//passport 적용
app.use(passport.initialize())
app.use(passport.session())
 
//플래시 메시지 관련
app.use(flash())

//로그인 정보 뷰에서만 변수로 셋팅
app.use((req, res, next) => {
    app.locals.isLogin = req.isAuthenticated() // -> passport에서 제공하는 함수
                                               // 로그인 : true, 로그인X : false
    //app.locals.urlparameter = req.url         //현재 url 정보를 보내고 싶으면 이와같이 셋팅
    //app.locals.userData = req.user            //사용 정보를 보내고 싶으면 이와같이 셋팅
    next()
  })

app.use('/', home)

app.use('/admin', admin)
app.use('/accounts', accounts)
app.use('/auth', auth)
app.use('/chat', chat)

const server = app.listen( port, () => console.log('Server Running', port))

import listen from 'socket.io'
import socketConnection from './libs/socketConnection'
const io = listen(server)
socketConnection(io)