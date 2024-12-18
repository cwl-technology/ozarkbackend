const mongoose = require("mongoose");

const our_expertise_Schema = new mongoose.Schema({
    benefits_heading: {
        type: String,
        default: null
    },
    benefits_description: {
        type: String,
        default: null
    },
    benefits_image: {
        type: String,
        default: null
    },
    advice_heading: {
        type: String,
        default: null
    },
    advice_description: {
        type: String,
        default: null
    },
    advice_image: {
        type: String,
        default: null
    },
    audit_heading: {
        type: String,
        default: null
    },
    audit_description: {
        type: String,
        default: null
    },
    audit_image: {
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

const our_expertise_model = new mongoose.model("our_expertise_model", our_expertise_Schema);
module.exports = our_expertise_model;