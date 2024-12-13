const express = require("express");
const { createBenefit, deleteBenefit, updateBenefits, getAllBenefitData, getBenefitData, changeStatus } = require("../controller/benefits_controller");
const router = express.Router();

router.post("/create_benefit", createBenefit);
router.post("/delete_benefit", deleteBenefit);
router.post("/update_benefit", updateBenefits);
router.get("/get_all_benefit",getAllBenefitData);
router.post("/get_benefit_data",getBenefitData);
router.post("/change_status",changeStatus);

module.exports = router;