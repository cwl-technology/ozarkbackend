const vision_value_model = require("../model/visionandvalues_model");

const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const updateVisionAndValues = async (req, res) => {
    try {
        const { main_heading, main_content, subheading1, subheading2, subheading3, content1, content2, content3, title, keyword, meta_description, description, id } = req.body;

        const currentData = await vision_value_model.findOne({ _id: id });

        const icon1 = req.files?.icon1?.[0].filename || currentData.icon1;
        const icon2 = req.files?.icon2?.[0].filename || currentData.icon2;
        const icon3 = req.files?.icon3?.[0].filename || currentData.icon3;
        const image1 = req.files?.image1?.[0].filename || currentData.image1;
        const image2 = req.files?.image2?.[0].filename || currentData.image2;
        const image3 = req.files?.image3?.[0].filename || currentData.image3;
        const image4 = req.files?.image4?.[0].filename || currentData.image4;
        const breadcrumb_image = req.files?.breadcrumb_image?.[0].filename || currentData.breadcrumb_image;

        const data = await vision_value_model.findByIdAndUpdate({ _id: id }, { main_heading, main_content, subheading1, subheading2, subheading3, content1, content2, content3, title, keyword, meta_description, description, icon1, icon2, icon3, image1, image2, image3, image4, breadcrumb_image })

        if (req.files?.icon1 && data?.icon1) {
            fs.unlinkSync(`./uploads/${data?.icon1}`)
        }
        if (req.files?.icon2 && data?.icon2) {
            fs.unlinkSync(`./uploads/${data?.icon2}`)
        }
        if (req.files?.icon3 && data?.icon3) {
            fs.unlinkSync(`./uploads/${data?.icon3}`)
        }
        if (req.files?.image1 && data?.image1) {
            fs.unlinkSync(`./uploads/${data?.image1}`)
        }
        if (req.files?.image2 && data?.image2) {
            fs.unlinkSync(`./uploads/${data?.image2}`)
        }
        if (req.files?.image3 && data?.image3) {
            fs.unlinkSync(`./uploads/${data?.image3}`)
        }
        if (req.files?.image4 && data?.image4) {
            fs.unlinkSync(`./uploads/${data?.image4}`)
        }
        if (req.files?.breadcrumb_image && data?.breadcrumb_image) {
            fs.unlinkSync(`./uploads/${data?.breadcrumb_image}`)
        }
        res.json({ message: "Updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error !", status: 0 })
    }
}

const getVisionAndValueData = async (req, res) => {
    try {
        const data = await vision_value_model.findOne({});

        data.icon1 = `${BASE_URL}/uploads/${data.icon1}`
        data.icon2 = `${BASE_URL}/uploads/${data.icon2}`
        data.icon3 = `${BASE_URL}/uploads/${data.icon3}`
        data.image1 = `${BASE_URL}/uploads/${data.image1}`
        data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.image3 = `${BASE_URL}/uploads/${data.image3}`
        data.image4 = `${BASE_URL}/uploads/${data.image4}`
        data.breadcrumb_image = `${BASE_URL}/uploads/${data.breadcrumb_image}`

        res.json({ message: "get data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error !", status: 0 })
    }
}

module.exports = {
    updateVisionAndValues,
    getVisionAndValueData
}