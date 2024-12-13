const mongoose = require("mongoose");

const team_member_schmea = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    designation: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }
})

const team_member_model = new mongoose.model("team_member_model", team_member_schmea);
module.exports = team_member_model;