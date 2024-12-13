const express = require("express");
const router = express.Router();
const multer = require("multer");
const { updateLeadership, getLeaderShipPagedata } = require("../controller/leadership_team_controller");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/update_leadership_page", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
    { name: 'icon3', maxCount: 1 },
    { name: 'icon4', maxCount: 1 },
]), updateLeadership);

router.get("/get_leadership_page_data", getLeaderShipPagedata);

module.exports = router;