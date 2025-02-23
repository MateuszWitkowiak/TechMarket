const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
    role: { type: String, enum: ["user", "admin"], default: "user"},
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
})

const User = mongoose.model("User", userSchema)

module.exports = User