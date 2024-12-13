const mongoose = require("mongoose");

const faq_schema = new mongoose.Schema({
    solution_id: {
        type: String,
        default: null
    },
    heading: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
})

const faq_model = new mongoose.model("faq_model", faq_schema);
module.exports = faq_model;