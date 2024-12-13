const express = require("express");
const router = express.Router();

const { updateResponsibility, getResponsibilityData } = require("../controller/social_responsibility_controller");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/update_social_responsibility", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
    { name: 'icon3', maxCount: 1 },
    { name: 'icon4', maxCount: 1 },
    { name: 'icon5', maxCount: 1 },
    { name: 'icon6', maxCount: 1 },
    { name: 'breadcrumb_image', maxCount: 1 },
    { name: 'gallery1', maxCount: 1 },
    { name: 'gallery2', maxCount: 1 },
    { name: 'gallery3', maxCount: 1 },
    { name: 'gallery4', maxCount: 1 },
    { name: 'gallery5', maxCount: 1 },
    { name: 'gallery6', maxCount: 1 },
    { name: 'gallery7', maxCount: 1 },
    { name: 'gallery8', maxCount: 1 },
    { name: 'gallery9', maxCount: 1 },
    { name: 'gallery10', maxCount: 1 },
    { name: 'gallery11', maxCount: 1 },
    { name: 'gallery12', maxCount: 1 },
    { name: 'gallery13', maxCount: 1 },
    { name: 'gallery14', maxCount: 1 },
]), updateResponsibility);
router.get("/get_social_responsibility", getResponsibilityData);

module.exports = router; 