const mongoose = require("mongoose");

const career_schema = new mongoose.Schema({
    subheading1: {
        type: String,
        default: null
    },
    content1: {
        type: String,
        default: null
    },
    hover_content1: {
        type: String,
        default: null
    },
    subheading2: {
        type: String,
        default: null
    },
    content2: {
        type: String,
        default: null
    },
    hover_content2: {
        type: String,
        default: null
    },
    subheading3: {
        type: String,
        default: null
    },
    content3: {
        type: String,
        default: null
    },
    hover_content3: {
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

const career_model = new mongoose.model("career_model", career_schema);
module.exports = career_model;