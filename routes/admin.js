import express from 'express'
import ProductsModel from '../models/ProductsModel'

export const router = express.Router()

router.get('/products/write', (req, res) => {
    res.render('admin/form')
})

// DB 저장
router.post('/products/write', (req, res) => {
    const product = new ProductsModel({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    product.save((err) => {
        res.redirect('/admin/products')
    })
})