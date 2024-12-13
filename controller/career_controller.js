const career_model = require("../model/career_model");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const updateCareerPage = async (req, res) => {
    try {
        const { subheading1, content1, hover_content1, subheading2, content2, hover_content2, subheading3, content3, hover_content3, title, keyword, meta_description, id } = req.body;

        const currentData = await career_model.findOne({ _id: id });
        const icon1 = req.files?.icon1?.[0].filename || currentData.icon1
        const icon2 = req.files?.icon2?.[0].filename || currentData.icon2
        const icon3 = req.files?.icon3?.[0].filename || currentData.icon3

        const data = await career_model.findByIdAndUpdate({ _id: id }, { subheading1, content1, hover_content1, subheading2, content2, hover_content2, subheading3, content3, hover_content3, title, keyword, meta_description, icon1, icon2, icon3 });

        if (req.files?.icon1 && data.icon1) {
            fs.unlinkSync(`./uploads/${data.icon1}`)
        }
        if (req.files?.icon2 && data.icon2) {
            fs.unlinkSync(`./uploads/${data.icon2}`)
        }
        if (req.files?.icon3 && data.icon3) {
            fs.unlinkSync(`./uploads/${data.icon3}`)
        }
        res.json({ message: "Updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getCareerPageData = async (req, res) => {
    try {
        const data = await career_model.findOne({});

        data.icon1 = `${BASE_URL}/uploads/${data.icon1}`
        data.icon2 = `${BASE_URL}/uploads/${data.icon2}`
        data.icon3 = `${BASE_URL}/uploads/${data.icon3}`

        res.json({ message: "get data successfully", status: 1, data: data });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    updateCareerPage,
    getCareerPageData
}