const { randomUUID } = require('crypto')
const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.UUID, default: () => randomUUID() },
    products: [{ required: true, type: mongoose.Schema.Types.UUID, ref: 'Product' }],
    totalAmount: { required: true, type: Number },
    createdDate: { type: Date, default: Date.now },
})
const OrderModel = mongoose.model('Order', orderSchema)
module.exports = OrderModel