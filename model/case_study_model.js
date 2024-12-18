const mongoose = require("mongoose");

const case_study_schema = new mongoose.Schema({
    solution_id: {
        type: String,
        default: null
    },
    heading: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    description: {
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

const case_study_model = new mongoose.model("case_study_model", case_study_schema);
module.exports = case_study_model;