const mongoose = require("mongoose")

const OpinionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    reported: { type: Boolean, default: false },
    reportReason: { type: String }
})

const Opinion = mongoose.Model("Opinion", OpinionSchema)