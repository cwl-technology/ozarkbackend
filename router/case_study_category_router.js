const express = require('express');
const { createCaseStudyCategory, updateCaseStudyCategory, getAllCaseStudyCategory, getCaseStudyDataCategory, deleteCaseStudyCategory, changeStatus } = require('../controller/case_study_category_controller');
const router = express.Router();

router.post("/create_case_study_category", createCaseStudyCategory);
router.post("/update_case_study_category", updateCaseStudyCategory);
router.get("/get_all_case_study_category", getAllCaseStudyCategory);
router.post("/get_case_study_category_data", getCaseStudyDataCategory);
router.post("/delete_case_study_category", deleteCaseStudyCategory);
router.post("/change_status", changeStatus);

module.exports = router;