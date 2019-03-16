import mongoose from 'mongoose'
const Schema = mongoose.Schema
import {autoIncrement} from 'mongoose-plugin-autoinc'


//필드명
const ProductsSchema = new Schema({
    name : {                    //제품명
        type: String,
        required: [true, '제목을 입력해주세요']
    },     
    thumbnail : String,         //이미지 파일명         
    price : Number,             //가격
    description : String,       //설명
    created_at : {              //작성일
        type : Date,
        default : Date.now()
    }
})

// virtual 변수는 호출되면 실행하는 함수
// set: 변수의 값을 바꾸거나 셋팅하면 호출
// get: getDate변수를 호출하는 순간 날짜 월일이 찍힌다.
ProductsSchema.virtual('getDate').get(function () {
    const date = new Date(this.created_at)
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    }
})

// 1씩 증가하는 primary Key를 만든다
// model : 생성할 document 이름
// field : primary key , startAt : 1부터 시작
ProductsSchema.plugin( autoIncrement , { model : 'products' , field : 'id' , startAt : 1 })
const model = mongoose.model('products', ProductsSchema)
export default model