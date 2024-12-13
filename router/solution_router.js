const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createSolution, updateSolution, deleteSolution, getAllSolutions, getSolutionData, changeStatus, getSolutionList } = require("../controller/solution_controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })



router.post("/create_solution", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
]), createSolution);

router.post("/update_solution", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'icon1', maxCount: 1 },
    { name: 'icon2', maxCount: 1 },
]), updateSolution)

router.post("/delete_solution", deleteSolution);
router.get("/get_all_solutions", getAllSolutions);
router.post("/get_solution_data", getSolutionData);
router.post("/change_status", changeStatus);
router.get("/get_solution_list", getSolutionList);

module.exports = router;