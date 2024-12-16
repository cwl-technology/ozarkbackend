const express = require("express");
const { updateVisionAndValues, getVisionAndValueData } = require("../controller/vision_value_controller");
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

router.post("/update_vision_and_values", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
]), updateVisionAndValues);
router.get("/get_vision_value", getVisionAndValueData);

module.exports = router; 