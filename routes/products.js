import express from 'express'
import ProductsModel from '../models/ProductsModel'
import CommentsModel from '../models/CommentsModel'
import co from 'co'
const router = express.Router()

router.get('/:id' , function(req, res){

    var getData = co(function* (){
        return {
            product : yield ProductsModel.findOne( { 'id' :  req.params.id }).exec(),
            comments : yield CommentsModel.find( { 'product_id' :  req.params.id }).exec()
        };
    });
    getData.then( result =>{
        res.render('products/detail', { product: result.product , comments : result.comments });
    })
})


module.exports = router