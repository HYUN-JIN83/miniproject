import express from 'express'
import ProductsModel from '../models/ProductsModel'
import CommentsModel from '../models/CommentsModel'
// csrf
import csrf from 'csurf'
const csrfProtection = csrf({cookie:true})

// 이미지 저장위치
import path from 'path'
import fs from 'fs'
const uploadDir = path.join(__dirname, '../uploads')

// multer
import multer from 'multer'
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir)
    },
    filename: (req, file, callback) => {
        callback(null, 'products-'+ Date.now() + '.'+ file.mimetype.split('/')[1])
    }
})
const upload = multer({storage})

const router = express.Router()

// 리스트 출력
router.get('/products', (req, res) => {
    ProductsModel.find((err, products) => {
        res.render('admin/products', {products})
    })
})

router.get('/products/write', csrfProtection, (req, res) => {
    res.render('admin/form', {product:"", csrfToken: req.csrfToken()})
})

// DB 저장
router.post('/products/write', upload.single('thumbnail'), csrfProtection, (req, res) => {
    const product = new ProductsModel({
        name: req.body.name,
        price: req.body.price,
        thumbnail: (req.file) ? req.file.filename: "",
        description: req.body.description
    })
    
    // 유효성체크
    if(!product.validateSync()){
        product.save((err) => {
            res.redirect('/admin/products')
        })
    }
    
})

router.get('/products/detail/:id' , (req, res) => {
    //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
    ProductsModel.findOne( { 'id' :  req.params.id } , (err ,product) => {
        CommentsModel.find({product_id : req.params.id}, (err, comments) => {
            res.render('admin/productsDetail', {product, comments})
        })
    })
})

router.get('/products/edit/:id' , csrfProtection, (req, res) => {
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ProductsModel.findOne({ id : req.params.id } , (err, product) => {
        res.render('admin/form', {product, csrfToken: req.csrfToken()})
    })
})

router.post('/products/edit/:id', upload.single('thumbnail'), csrfProtection, (req, res) => {
    //그전에 저장되어 있는 파일명 받아옴
    ProductsModel.findOne( {id : req.params.id} , (err, product) => {
        //요청중에 파일이 존재 할시 이전이미지 지움.
        if(req.file && product.thumbnail){             
            fs.unlinkSync( uploadDir + '/' + product.thumbnail );
        }

        //넣을 변수 값을 셋팅
        const query = {
            name : req.body.name,
            thumbnail: (req.file) ? req.file.filename: product.thumbnail,
            price : req.body.price,
            description : req.body.description
        }

        //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
        ProductsModel.update({ id : req.params.id }, { $set : query }, (err) => {
            res.redirect('/admin/products/detail/' + req.params.id ) //수정후 본래보던 상세페이지로 이동
        })
    })
})

router.get('/products/delete/:id', (req, res) => {
    ProductsModel.remove({ id : req.params.id }, (err) => {
        res.redirect('/admin/products')
    })
})

router.post('/products/ajax_comment/insert', (req,res) => {
    const comment = new CommentsModel({
        content : req.body.content,
        product_id : parseInt(req.body.product_id)
    })
    comment.save((err, comment) => {
        res.json({
            id : comment.id,
            content : comment.content,
            message : 'success'
        })
    })
})

router.post('/products/ajax_comment/delete', (req, res) => {
    CommentsModel.remove({ id : req.body.comment_id } , (err) => {
        res.json({ message : "success" })
    })
})

module.exports = router