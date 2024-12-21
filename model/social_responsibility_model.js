const mongoose = require("mongoose");

const social_responsibility_schema = new mongoose.Schema({
    heading1: {
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
    gallery1: {
        type: String,
        default: null
    },
    gallery2: {
        type: String,
        default: null
    },
    gallery3: {
        type: String,
        default: null
    },
    gallery4: {
        type: String,
        default: null
    },
    gallery5: {
        type: String,
        default: null
    },
    gallery6: {
        type: String,
        default: null
    },
    gallery7: {
        type: String,
        default: null
    },
    gallery8: {
        type: String,
        default: null
    },
    gallery9: {
        type: String,
        default: null
    },
    gallery10: {
        type: String,
        default: null
    },
    gallery11: {
        type: String,
        default: null
    },
    gallery12: {
        type: String,
        default: null
    },
    gallery13: {
        type: String,
        default: null
    },
    gallery14: {
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

const social_responsibility_model = new mongoose.model("social_responsibility_model", social_responsibility_schema);
module.exports = social_responsibility_model;