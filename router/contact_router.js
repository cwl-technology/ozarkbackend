const express = require("express");
const { getContactEnquiryData, postContactEnquiryData } = require("../controller/contact_controller");

const router = express.Router();

router.post("/post_contact_enquiry_data",postContactEnquiryData);
router.get("/get_contact_enquiry_data",getContactEnquiryData);

module.exports = router;