const express = require("express");
const { updatePageTitle, getPageTitleData, getAllPageTitleData, getPageTitleDataByType } = require("../controller/page_title_controller");
const router = express.Router();

router.post("/update_page_title", updatePageTitle);
router.get("/get_all_page_title_data", getAllPageTitleData);
router.post("/get_page_title_data", getPageTitleData)
router.post("/get_page_title_by_type",getPageTitleDataByType);


module.exports = router;