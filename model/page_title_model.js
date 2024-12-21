const mongoose = require("mongoose");

const page_title_schema = new mongoose.Schema({
    type: {
        type: String,
        default: null
    },
    title: {
        type: String,
        default: null
    },
    keyword: {
        type: String,
        default: null
    },
    meta_description: {
        type: String,
        default: null
    }
})

const page_title_model = new mongoose.model("page_title_model", page_title_schema);
module.exports = page_title_model;