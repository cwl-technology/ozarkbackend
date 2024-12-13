const mongoose = require("mongoose");

const benefits_schema = new mongoose.Schema({
    solution_id: {
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
    status: {
        type: String,
        default: 1
    }
})

const benefits_model = new mongoose.model("benefit_model", benefits_schema);
module.exports = benefits_model;