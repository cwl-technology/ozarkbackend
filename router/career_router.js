const express = require("express");
const { updateCareerPage, getCareerPageData } = require("../controller/career_controller");

const router = express.Router();
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/update_career_page", upload.fields([
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
    { name: 'icon3', maxCount: 1 },
]), updateCareerPage);
router.get("/get_career_page", getCareerPageData);

module.exports = router;
