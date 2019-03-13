import express from 'express'
import ProductsModel from '../models/ProductsModel'

export const router = express.Router()

// 리스트 출력
router.get('/products', (req, res) => {
    ProductsModel.find((err, products) => {
        res.render('admin/products', {products})
    })
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