const admin_model = require("../model/admin_model");


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !password) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        if (!emailRegex.test(email)) {
            return res.json({ message: "Please enter a valid email", status: 0 });
        }

        const isUserExist = await admin_model.findOne({ email, password });

        if (!isUserExist) {
            return res.json({ message: "Invalid credentials", status: 0 });
        }
        res.json({ message: "Login successfully", status: 1, name: isUserExist.name });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, password, confirm_password,flag } = req.body;

        if (flag == 1) {
            if (!email) {
                return res.json({ message: "Email is required", status: 0 });
            }

            const emailExist = await admin_model.findOne({ email: email });
            if (!emailExist) {
                return res.json({ message: "Email not found", status: 0 });
            }
            return res.json({ message: "Email found", status: 1 })
        } else {
            const emailExist = await admin_model.findOne({ email: email });
            const id = emailExist._id;
            if (!password || !confirm_password) {
                return res.json({ message: "Both password and confirmation are required", status: 0 });
            }

            if (password !== confirm_password) {
                return res.json({ message: "Passwords do not match", status: 0 });
            }

            const updatePass = await admin_model.findByIdAndUpdate(id, { password: password });
            if (!updatePass) {
                return res.json({ message: "Failed to reset password", status: 0 });
            }
            res.json({ message: "Password reset successfully", status: 1 });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    loginController,
    resetPassword
}