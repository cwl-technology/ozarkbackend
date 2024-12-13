const express = require("express");
const { getAllFAQData, createFAQ, updateFAQ, deleteFAQ, getFAQData, changeStatus } = require("../controller/faq_controller");
const router = express.Router();

router.post("/create_faq",createFAQ);
router.post("/update_faq",updateFAQ);
router.post("/delete_faq",deleteFAQ);
router.post("/get_faq_data",getFAQData);
router.get("/get_all_faq",getAllFAQData);
router.post("/change_status",changeStatus);


module.exports = router;