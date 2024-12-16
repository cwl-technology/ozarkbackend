const express = require('express');
const { createTestimonials, updateTestimonials, deleteTestimonials, getAllTestimonials, getTestimonial, changeStatus, getAllActiveTestimonials } = require('../controller/testimonial_controller');
const router = express();

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

router.post("/create_testimonial", upload.single("image"), createTestimonials);
router.post("/update_testimonial", upload.single("image"), updateTestimonials);
router.post("/delete_testimonial", deleteTestimonials);
router.get("/get_all_testimonial", getAllTestimonials);
router.post("/get_testimonial_data", getTestimonial);
router.post("/get_active_testimonial_data",getAllActiveTestimonials);
router.post("/change_status", changeStatus);


module.exports = router;