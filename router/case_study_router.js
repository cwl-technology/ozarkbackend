const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createCaseStudy, updateCaseStudy, deleteCaseStudy, getCaseStudyData, getAllCaseStudyData, getActiveCaseStudy, getCaseStudyBySlug, changeStatus, getLatestCaseStudy } = require("../controller/case_study_controller");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/create_case_study",upload.single("image"),createCaseStudy)
router.post("/update_case_study",upload.single("image"),updateCaseStudy);
router.post("/delete_case_study",deleteCaseStudy);
router.post("/get_case_study_data",getCaseStudyData);
router.get("/get_all_case_study",getAllCaseStudyData);
router.get("/get_active_case_study",getActiveCaseStudy);
router.get("/get_latest_case_study",getLatestCaseStudy);
router.post("/get_case_study_by_slug",getCaseStudyBySlug);
router.post("/change_status",changeStatus);

module.exports = router;