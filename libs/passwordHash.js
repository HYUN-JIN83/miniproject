import crypto from 'crypto'
const mysalt = 'hjkimt'

const password = (password) => {
    return crypto.createHash('sha512').update(password+mysalt).digest('base64')
}