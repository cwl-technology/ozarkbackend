const express = require("express");
const router = express.Router();

const { loginController,resetPassword } = require("../controller/auth_controller")

router.post("/admin_login", loginController);
router.post("/reset_password", resetPassword);


module.exports = router;