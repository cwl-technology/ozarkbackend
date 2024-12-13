const mongoose = require("mongoose");

const admin_schema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null
    }
})

const admin_model = new mongoose.model("admin_models", admin_schema);
module.exports = admin_model;