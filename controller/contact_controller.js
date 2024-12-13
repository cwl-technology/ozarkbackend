const contact_model = require("../model/contact_model");

const postContactEnquiryData = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email) {
            return res.json({ message: "Please fill the requied fields", status: 0 });
        }

        const data = new contact_model({ name, email, subject, message });
        await data.save();
        res.json({ message: "Enquiry received", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getContactEnquiryData = async (req, res) => {
    try {
        const data = await contact_model.find({});
        if (!data) {
            return res.json({ message: "Unable to get contact enquiry data", status: 0 });
        }
        res.json({ message: "Get contact enquiry data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    postContactEnquiryData,
    getContactEnquiryData
}