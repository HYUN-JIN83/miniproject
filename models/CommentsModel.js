import mongoose from 'mongoose'
const Schema = mongoose.Schema
import {autoIncrement} from 'mongoose-plugin-autoinc'

const CommentsSchema = new Schema({
    content : String,
    created_at : {
        type : Date,
        default : Date.now()
    },
    product_id : Number         // 제품번호저장. 조회 -> 해당 페이지 댓글만
})

CommentsSchema.plugin( autoIncrement, { model: 'comments', field : 'id', startAt : 1 })
const model = mongoose.model('comments', CommentsSchema)
export default model