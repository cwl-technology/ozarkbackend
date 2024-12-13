const mongoose = require("mongoose");

const testimonial_schema = new mongoose.Schema({
    solution_id: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    designation: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    rating: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }

})

const testimonial_model = new mongoose.model("tesitmonial_model", testimonial_schema);
module.exports = testimonial_model;