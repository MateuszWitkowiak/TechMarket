const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true }
        }
    ],
    status: { 
        type: String, 
        enum: ["pending", "processing", "completed", "canceled"], 
        default: "pending" 
    },
    totalAmount: { type: Number, required: true },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentStatus: { 
        type: String, 
        enum: ["pending", "paid", "failed"], 
        default: "pending" 
    },
    orderDate: { type: Date, default: Date.now },
    shippingDate: { type: Date },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
