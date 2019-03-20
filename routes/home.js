import express from 'express'
import ProductsModel from '../models/ProductsModel'
const router = express.Router()

/* GET home page. */
router.get('/', (req,res) => {
    ProductsModel.find((err,products) => { //첫번째 인자는 err, 두번째는 받을 변수명
        res.render('home' , 
            {products}                  // DB에서 받은 products를 products변수명으로 내보냄
        )
    })
})

module.exports = router