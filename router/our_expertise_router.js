const express = require("express");
const router = express.Router();
const multer = require("multer");
const { updateOurExpertise, GetOurExpertiseData } = require("../controller/our_expertise_controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/update_our_expertise", upload.fields([
    { name: 'benefits_image', maxCount: 1 },
    { name: 'advice_image', maxCount: 1 },
    { name: 'audit_image', maxCount: 1 },
]), updateOurExpertise);

router.get("/get_our_expertise", GetOurExpertiseData);

module.exports = router;