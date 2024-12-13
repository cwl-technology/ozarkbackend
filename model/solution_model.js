const mongoose = require("mongoose");

const solution_schema = new mongoose.Schema({
    solution_name: {
        type: String,
        default: null
    },
    solution_slug: {
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
    solution_description: {
        type: String,
        default: null
    },
    sub_heading1: {
        type: String,
        default: null
    },
    content1: {
        type: String,
        default: null
    },
    sub_heading2: {
        type: String,
        default: null
    },
    content2: {
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
    why_choose_description: {
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
    },
    status: {
        type: Number,
        default: 1
    }
})


const solution_model = new mongoose.model("solution_model", solution_schema);
module.exports = solution_model;
