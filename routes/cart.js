import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    var totalAmount = 0       // 총 결제금액
    var cartList = {}         // 장바구니 리스트
    // 쿠키 있는지 확인한 후 뷰로 넘겨줌
    if(typeof(req.cookies.cartList) !== 'undefined'){
        // 장바구니 데이터          
        var cartList = JSON.parse(unescape(req.cookies.cartList))

        // 총 가격을 더해서 전달해준다
        for(var key in cartList){
            totalAmount += parseInt(cartList[key].amount)
        }
    }
    res.render('cart/index', {cartList, totalAmount})
})

module.exports = router