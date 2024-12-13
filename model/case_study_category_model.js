const mongoose = require("mongoose")

const case_study_category_schema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    }
})

const case_study_category_model = new mongoose.model("case_study_category_model", case_study_category_schema);

module.exports = case_study_category_model;
