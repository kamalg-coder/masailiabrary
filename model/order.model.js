const { Schema} = require("mongoose");
const orderSchema=new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    books: { type: Schema.Types.ObjectId, ref: 'Book' },
    totalAmount: Number
},{
    versionKey:false
})
let OrderModel=mongooose.model('order',orderSchema)

module.exports={OrderModel}