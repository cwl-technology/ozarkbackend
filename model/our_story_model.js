const mongoose = require("mongoose");

const ourstory_schema = new mongoose.Schema({
    image1: {
        type: String,
        default: null
    },
    image2: {
        type: String,
        default: null
    },
    image3: {
        type: String,
        default: null
    },
    heading: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    icon1: {
        type: String,
        default: null
    },
    subheading1: {
        type: String,
        default: null
    },
    content1: {
        type: String,
        default: null
    },
    icon2: {
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
    icon3: {
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
    icon4: {
        type: String,
        default: null
    },
    subheading4: {
        type: String,
        default: null
    },
    content4: {
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

const ourstory_model = new mongoose.model("ourstory_model", ourstory_schema);
module.exports = ourstory_model;