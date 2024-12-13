const mongoose = require("mongoose");

const home_schema = new mongoose.Schema({
    why_choose_us: {
        heading: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        image: {
            type: String,
            default: null
        },
        vision_content: {
            type: String,
            default: null
        },
        mission_content: {
            type: String,
            default: null
        },
        values_content: {
            type: String,
            default: null
        }
    },
    our_expertise: {
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
        }
    },
    meta_tags: {
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
    }
})


const home_model = new mongoose.model("home_model", home_schema);
module.exports = home_model;