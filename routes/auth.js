import express from 'express'
import UserModel from '../models/UserModel'
import passport from 'passport'
const FacebookStrategy = require('passport-facebook').Strategy
const router = express.Router()
 
passport.serializeUser((user, done) => done(null, user))
 
passport.deserializeUser((user, done) => done(null, user))

passport.use(new FacebookStrategy({
        // https://developers.facebook.com에서 appId 및 scretID 발급
        clientID: "앱 ID 입력", 
        clientSecret: "앱 시크릿 코드 입력", 
        callbackURL: "https://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email'] 
    },
    (accessToken, refreshToken, profile, done) => {
        UserModel.findOne({ username : "fb_" + profile.id }, (err, user) => {
            if(!user){                          //없으면 회원가입 후 로그인 성공페이지 이동
                const regData = {               //DB에 등록 및 세션에 등록될 데이터
                    username :  "fb_" + profile.id,
                    password : "facebook_login",
                    displayname : profile.displayName
                }
                const User = new UserModel(regData);
                User.save((err) => {            //DB저장
                    done(null,regData)          //세션 등록
                })
            }else{                              //있으면 DB에서 가져와서 세션등록
                done(null,user)
            }

        })
    }
))

// http://localhost:3000/auth/facebook 접근시 facebook으로 넘길 url 작성해줌
router.get('/facebook', passport.authenticate('facebook', { scope: 'email'}) )
 
 
//인증후 페이스북에서 이 주소로 리턴해줌. 상단에 적은 callbackURL과 일치
router.get('/facebook/callback',
    passport.authenticate('facebook', 
        { 
            successRedirect: '/',
            failureRedirect: '/auth/facebook/fail' 
        }
    )
)
//로그인 성공시 이동할 주소
router.get('/facebook/success', (req,res) => res.send(req.user))
 
router.get('/facebook/fail', (req,res) => res.send('facebook login fail'))

module.exports = router