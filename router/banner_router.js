const express = require('express');

const router = express();

const multer = require("multer");
const { createBanner, updateBanner, getBannerData, getAllBanner, changeStatus, deleteBanner } = require('../controller/banner_controller');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/create_banner", upload.single("image"), createBanner);
router.post("/update_banner", upload.single("image"), updateBanner);
router.post("/delete_banner",deleteBanner);
router.post("/get_banner_data", getBannerData);
router.post("/change_status", changeStatus);
router.get("/get_all_banners", getAllBanner);


module.exports = router;