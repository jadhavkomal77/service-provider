const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    adminId: { type: mongoose.Types.ObjectId, ref: "admin" },
    agencyadminId: { type: mongoose.Types.ObjectId, ref: "agencyadmin" },

    role: { type: String, enum: ["admin", "customer", "agencyadmin", "electritian", "plumber", "baker", "mechanic", "driver", "cleaning"], default: "customer" },

    address: { type: String, },
    date: { type: String },
    price: { type: String },
    time: { type: String },
    reason: { type: String },
    skills: { type: String },
    available: { type: String },
    hero: { type: String },
    isActive: { type: Boolean, default: true },
    isbook: { type: Boolean, default: false },

}, { timestamps: true })

module.exports = mongoose.model("admin", adminSchema)


