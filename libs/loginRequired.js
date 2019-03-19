module.exports = (req, res, next) => {
    if (!req.isAuthenticated()){ 
        res.redirect('/accounts/login')
    }else{
        return next()
    }
}