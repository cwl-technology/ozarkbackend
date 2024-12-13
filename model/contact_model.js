const mongoose = require("mongoose");

const contact_schema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    subject: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

const contact_model = new mongoose.model("contact_model", contact_schema);
module.exports = contact_model;