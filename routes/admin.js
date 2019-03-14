import express from 'express'
import ProductsModel from '../models/ProductsModel'

export const router = express.Router()

// 리스트 출력
router.get('/products', (req, res) => {
    ProductsModel.find((err, products) => {
        res.render('admin/products', {products})
    })
})

router.get('/products/write', (req, res) => {
    res.render('admin/form', {product:""})
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

router.get('/products/detail/:id' , (req, res) => {
    //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
    ProductsModel.findOne( { 'id' :  req.params.id } , (err ,product) => {
        res.render('admin/productsDetail', { product })
    })
})

router.get('/products/edit/:id' , (req, res) => {
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ProductsModel.findOne({ id : req.params.id } , (err, product) => {
        res.render('admin/form', { product })
    })
})

router.post('/products/edit/:id', (req, res) => {
    //넣을 변수 값을 셋팅한다
    const query = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
    }

    //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
    ProductsModel.update({ id : req.params.id }, { $set : query }, (err) => {
        res.redirect('/admin/products/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
    })
})