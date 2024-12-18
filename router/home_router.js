const express = require("express");
const router = express.Router();
const { updateHomePageData, getHomePageData, HomePageAPI, adminHomePageApi } = require("../controller/home_controller");
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


router.post("/update_home_page_data", upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
    { name: 'icon3', maxCount: 1 },
    { name: 'icon4', maxCount: 1 },
]), updateHomePageData);

router.get("/get_home_page_data", getHomePageData);
router.get("/home_page_api",HomePageAPI);
router.get("/admin_home_page_api",adminHomePageApi);

module.exports = router;