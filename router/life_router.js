const express = require("express");
const { updateLife, getLifeData } = require("../controller/life_controller");
const router = express.Router();
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

router.post("/update_life_ozark", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 },
    { name: 'image6', maxCount: 1 },
    { name: 'image7', maxCount: 1 },
    { name: 'image8', maxCount: 1 },
    { name: 'image9', maxCount: 1 },
    { name: 'image10', maxCount: 1 },
    { name: 'image11', maxCount: 1 },
    { name: 'image12', maxCount: 1 },
    { name: 'breadcrumb_image', maxCount: 1 },

]), updateLife);
router.get("/get_life_ozark_data", getLifeData);


module.exports = router;