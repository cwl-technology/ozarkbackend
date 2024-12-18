const our_expertise_model = require("../model/our_expertise_model");
const fs = require('fs');
const BASE_URL = process.env.BASE_URL

const updateOurExpertise = async (req, res) => {
    try {
        const { benefits_heading, benefits_description, advice_heading, advice_description, audit_heading, audit_description, title, keyword, meta_description, id } = req.body;

        const currentData = await our_expertise_model.findOne({ _id: id });
        const benefits_image = req.files?.benefits_image?.[0].filename || currentData?.benefits_image
        const advice_image = req.files?.advice_image?.[0].filename || currentData?.advice_image
        const audit_image = req.files?.audit_image?.[0].filename || currentData?.audit_image

        const data = await our_expertise_model.findByIdAndUpdate({ _id: id }, { benefits_heading, benefits_description, advice_heading, advice_description, audit_heading, audit_description, title, keyword, meta_description, benefits_image, advice_image, audit_image });

        if (!data) {
            return res.json({ message: "Unable to update our expertise", status: 0 })
        }


        if (req.files?.benefits_image && data?.benefits_image) {
            fs.unlinkSync(`./uploads/${data?.benefits_image}`);
        }
        if (req.files?.advice_image && data?.advice_image) {
            fs.unlinkSync(`./uploads/${data?.advice_image}`);
        }
        if (req.files?.audit_image && data?.audit_image) {
            fs.unlinkSync(`./uploads/${data?.audit_image}`);
        }

        res.json({ message: "Updated successfully", status: 1 })

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const GetOurExpertiseData = async (req, res) => {
    try {
        const data = await our_expertise_model.findOne({});
        if (!data) {
            return res.json({ message: "Unablte to get our expertise data", status: 0 });
        }
        data.benefits_image = `${BASE_URL}/uploads/${data.benefits_image}`;
        data.advice_image = `${BASE_URL}/uploads/${data.advice_image}`;
        data.audit_image = `${BASE_URL}/uploads/${data.audit_image}`;

        res.json({ message: "Get our expertise data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


module.exports = {
    updateOurExpertise,
    GetOurExpertiseData
};