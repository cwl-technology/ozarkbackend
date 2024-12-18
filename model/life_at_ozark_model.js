const mongoose = require("mongoose");

const life_schema = new mongoose.Schema({
    description1: {
        type: String,
        default: null
    },
    description2: {
        type: String,
        default: null
    },
    // breadcrumb_image: {
    //     type: String,
    //     default: null
    // },
    image1: {
        type: String,
        default: null
    },
    image2: {
        type: String,
        default: null
    },
    image3: {
        type: String,
        default: null
    },
    image4: {
        type: String,
        default: null
    },
    image5: {
        type: String,
        default: null
    },
    image6: {
        type: String,
        default: null
    },
    image7: {
        type: String,
        default: null
    },
    image8: {
        type: String,
        default: null
    },
    image9: {
        type: String,
        default: null
    },
    image10: {
        type: String,
        default: null
    },
    image11: {
        type: String,
        default: null
    },
    image12: {
        type: String,
        default: null
    },
    image13: {
        type: String,
        default: null
    },
    subheading1: {
        type: String,
        default: null
    },
    subheading2: {
        type: String,
        default: null
    },
    subheading3: {
        type: String,
        default: null
    },
  
    content1: {
        type: String,
        default: null
    },
    content2: {
        type: String,
        default: null
    },
    content3: {
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

})

const life_model = new mongoose.model("life_model", life_schema);
module.exports = life_model;