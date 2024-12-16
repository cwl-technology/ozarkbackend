const mongoose = require("mongoose");

const leadership_team_schema = new mongoose.Schema({
    subheading1: {
        type: String,
        default: null
    },
    content1: {
        type: String,
        default: null
    },
    icon1: {
        type: String,
        default: null
    },
    subheading2: {
        type: String,
        default: null
    },
    content2: {
        type: String,
        default: null
    },
    icon2: {
        type: String,
        default: null
    },
    subheading3: {
        type: String,
        default: null
    },
    content3: {
        type: String,
        default: null
    },
    icon3: {
        type: String,
        default: null
    },
    subheading4: {
        type: String,
        default: null
    },
    content4: {
        type: String,
        default: null
    },
    icon4: {
        type: String,
        default: null
    },
    // image1: {
    //     type: String,
    //     default: null
    // },
    // image2: {
    //     type: String,
    //     default: null
    // },
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

const leadership_team_model = new mongoose.model("leadership_team_model", leadership_team_schema);
module.exports = leadership_team_model;