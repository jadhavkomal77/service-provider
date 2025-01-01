const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({

    professionals: { type: mongoose.Types.ObjectId, ref: "admin", requied: true },
    costomer: { type: mongoose.Types.ObjectId, ref: "admin", requied: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    reason: { type: String, required: true },
    isAccept: { type: String, enum: ["accept", "reject", "pending"], default: "pending" },

})
module.exports = mongoose.model("book", bookSchema) 