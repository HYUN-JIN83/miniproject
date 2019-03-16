import crypto from 'crypto'
const mysalt = 'hjkimt'


module.exports = (password) => {
    return crypto.createHash('sha512').update( password + mysalt).digest('base64')
}