const express = require("express");
const { createJob, updateJob, deleteJob, getAllJobs, getJobData, changeStatus, postJobEnquiryData, getJobEnquiryData } = require("../controller/job_controller");
const router = express.Router();

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

router.post("/create_job", createJob);
router.post("/update_job", updateJob);
router.post("/delete_job", deleteJob);
router.get("/get_all_jobs", getAllJobs);
router.post("/get_job_data", getJobData);
router.post("/change_status", changeStatus);
router.post("/post_job_enquiry", upload.single("resume"), postJobEnquiryData);
router.get("/get_job_enquiry_data", getJobEnquiryData);


module.exports = router;