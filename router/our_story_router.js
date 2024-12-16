const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getOurStorydata, updateStory } = require("../controller/our_story_controller");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/update_story", upload.fields([
    { name: 'image', maxCount: 1 },
    // { name: 'image2', maxCount: 1 },
    // { name: 'image3', maxCount: 1 },
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
    { name: 'icon3', maxCount: 1 },
    { name: 'icon4', maxCount: 1 },
]), updateStory);

router.get("/get_story_data", getOurStorydata);

module.exports = router;