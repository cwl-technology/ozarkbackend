const express = require("express");
const { updateCareerPage, getCareerPageData } = require("../controller/career_controller");
const router = express.Router();


router.post("/update_career_page",updateCareerPage);
router.get("/get_career_page", getCareerPageData);

module.exports = router;
