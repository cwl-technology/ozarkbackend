const mongoose = require("mongoose");

const blog_schema = new mongoose.Schema({
    solution_id: {
        type: String,
        default: null,
    },
    main_image: {
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
    slug: {
        type: String,
        default: null
    },
    blog_date: {
        type: String,
        default: null
    },
    description1: {
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
    description2: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
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

const blog_model = new mongoose.model("blog_model", blog_schema);
module.exports = blog_model;