const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    items: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true},
            count: {type: Number, required: true, min: 1}
        }
    ],
    totalPrice: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 }
});

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart;