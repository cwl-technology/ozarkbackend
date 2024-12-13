const mongoose = require("mongoose");

const job_schema = new mongoose.Schema({
    job_title: {
        type: String,
        default: null
    },
    available_posts: {
        type: Number,
        default: null
    },
    job_description: {
        type: String,
        default: null
    },
    skills: {
        type: [
            {
                name: {
                    type: String,
                    default: ""
                }
            }
        ],
        default: []
    },
    status: {
        type: Number,
        default: 1
    }
})

const job_model = new mongoose.model("job_model", job_schema);
module.exports = job_model;