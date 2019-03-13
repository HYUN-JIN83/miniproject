import express from 'express'
export const router = express.Router()

router.get('/products', (req, res) => {
    res.render('admin/products', {message: 'hello'})
})
