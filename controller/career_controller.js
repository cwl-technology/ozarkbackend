const career_model = require("../model/career_model");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const updateCareerPage = async (req, res) => {
    try {
        const { subheading1, content1, hover_content1, subheading2, content2, hover_content2, subheading3, content3, hover_content3, title, keyword, meta_description, id } = req.body;


        const data = await career_model.findByIdAndUpdate({ _id: id }, { subheading1, content1, hover_content1, subheading2, content2, hover_content2, subheading3, content3, hover_content3, title, keyword, meta_description });

        if (!data) {
            return res.json({ message: "Unable to update career page data", status: 0 })
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

        if (!data) {
            return res.json({ message: "Unable to get career page data", status: 0 })
        }

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