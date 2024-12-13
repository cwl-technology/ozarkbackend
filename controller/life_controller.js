const life_model = require("../model/life_at_ozark_model");

const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const updateLife = async (req, res) => {
    try {
        const { description1, description2, meta_description, subheading1, subheading2, subheading3, subheading4, content1, content2, content3, content4, id, title, keyword } = req.body;

        const currentData = await life_model.findOne({ _id: id });
        let updatedImage = {};
        const imageFields = ["breadcrumb_image", "image1", "image2", "image3", "image4", "image5", "image6", "image7", "image8", "image9", "image10", "image11", "image12"]

        imageFields.forEach((image) =>
            updatedImage[image] = req.files?.[image]?.[0]?.filename || currentData[image]
        )


        const data = await life_model.findByIdAndUpdate({ _id: id }, { description1, description2, meta_description, subheading1, subheading2, subheading3, subheading4, content1, content2, content3, content4, title, keyword, ...updatedImage });

        imageFields.forEach(image => {
            if (req.files?.[image] && currentData[image]) {
                fs.unlinkSync(`./uploads/${currentData[image]}`);
            }
        });

        res.json({ message: "Updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


const getLifeData = async (req, res) => {
    try {
        const data = await life_model.findOne({})

        data.breadcrumb_image = `${BASE_URL}/uploads/${data.breadcrumb_image}`;
        data.image1 = `${BASE_URL}/uploads/${data.image1}`
        data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.image3 = `${BASE_URL}/uploads/${data.image3}`
        data.image4 = `${BASE_URL}/uploads/${data.image4}`
        data.image5 = `${BASE_URL}/uploads/${data.image5}`
        data.image6 = `${BASE_URL}/uploads/${data.image6}`
        data.image7 = `${BASE_URL}/uploads/${data.image7}`
        data.image8 = `${BASE_URL}/uploads/${data.image8}`
        data.image9 = `${BASE_URL}/uploads/${data.image9}`
        data.image10 = `${BASE_URL}/uploads/${data.image10}`
        data.image11 = `${BASE_URL}/uploads/${data.image11}`
        data.image12 = `${BASE_URL}/uploads/${data.image12}`

        res.json({ message: "get ozark life data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    updateLife,
    getLifeData
}