const express = require("express");
const { createTeamMember, updateTeamMember, deleteTeamMemeber, getAllTeamMember, getTeamMemberData, changeStatus, getAllActiveTeamMember } = require("../controller/team_member_controller");
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

router.post("/create_team_member", upload.single("image"), createTeamMember);
router.post("/update_team_member", upload.single("image"), updateTeamMember);
router.post("/delete_team_member", deleteTeamMemeber);
router.get("/get_all_team_member", getAllTeamMember);
router.post("/get_team_member_data", getTeamMemberData);
router.post("/change_status", changeStatus);
router.get("/get_all_active_team_member", getAllActiveTeamMember);


module.exports = router;