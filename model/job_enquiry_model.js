const mongoose = require("mongoose");

const job_enquiry_schema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: Number,
        default: null
    },
    position: {
        type: String,
        default: null
    },
    experience: {
        type: String,
        default: null
    },
    notice_period: {
        type: String,
        default: null
    },
    resume: {
        type: String,
        default: null
    },

}, {
    timestamps: true
})

const job_enquiry_model = new mongoose.model("job_enquiry_model", job_enquiry_schema);
module.exports = job_enquiry_model;