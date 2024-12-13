const mongoose = require("mongoose");

const vision_value_schema = new mongoose.Schema({
    main_heading: {
        type: String,
        default: null
    },
    main_content: {
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
    subheading2: {
        type: String,
        default: null
    },
    content2: {
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
    description: {
        type: String,
        default: null
    },
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
    image4: {
        type: String,
        default: null
    },
    breadcrumb_image: {
        type: String,
        default: null
    },
    icon1: {
        type: String,
        default: null
    },
    icon2: {
        type: String,
        default: null
    },
    icon3: {
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

const vision_value_model = new mongoose.model("vision_value_model", vision_value_schema);
module.exports = vision_value_model;