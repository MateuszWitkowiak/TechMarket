const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    category: { type: String, required: true },
    photoUrl: { type: String, required: true },
    price: { type: Number, required: true },
    technicalData: { type: Map, of: String },
    productDescription: { type: String, required: true },
    opinions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Opinion" }],
    averageRating: { type: Number, default: 0 }
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
