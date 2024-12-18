const social_responsibility_model = require("../model/social_responsibility_model");
const BASE_URL = process.env.BASE_URL;
const fs = require("fs");


const updateResponsibility = async (req, res) => {
    try {
        const { description1, description2, heading1, heading2, subheading1, content1, subheading2, content2, subheading3, content3, subheading4, content4, subheading5, content5, subheading6, content6, title, keyword, meta_description, id } = req.body;
        console.log(id);
        const currentData = await social_responsibility_model.findOne({ _id: id });

        const icon1 = req.files?.icon1?.[0].filename || currentData.icon1;
        const icon2 = req.files?.icon2?.[0].filename || currentData.icon2;
        const icon3 = req.files?.icon3?.[0].filename || currentData.icon3;
        const icon4 = req.files?.icon4?.[0].filename || currentData.icon4;
        const icon5 = req.files?.icon5?.[0].filename || currentData.icon5;
        const icon6 = req.files?.icon6?.[0].filename || currentData.icon6;
        const image1 = req.files?.image1?.[0].filename || currentData.image1;
        const image2 = req.files?.image2?.[0].filename || currentData.image2;
        const breadcrumb_image = req.files?.breadcrumb_image?.[0].filename || currentData.breadcrumb_image

        const gallery1 = req.files?.gallery1?.[0].filename || currentData.gallery1;
        const gallery2 = req.files?.gallery2?.[0].filename || currentData.gallery2;
        const gallery3 = req.files?.gallery3?.[0].filename || currentData.gallery3;
        const gallery4 = req.files?.gallery4?.[0].filename || currentData.gallery4;
        const gallery5 = req.files?.gallery5?.[0].filename || currentData.gallery5;
        const gallery6 = req.files?.gallery6?.[0].filename || currentData.gallery6;
        const gallery7 = req.files?.gallery7?.[0].filename || currentData.gallery7;
        const gallery8 = req.files?.gallery8?.[0].filename || currentData.gallery8;
        const gallery9 = req.files?.gallery9?.[0].filename || currentData.gallery9;
        const gallery10 = req.files?.gallery10?.[0].filename || currentData.gallery10;
        const gallery11 = req.files?.gallery11?.[0].filename || currentData.gallery11;
        const gallery12 = req.files?.gallery12?.[0].filename || currentData.gallery12;
        const gallery13 = req.files?.gallery13?.[0].filename || currentData.gallery13;
        const gallery14 = req.files?.gallery14?.[0].filename || currentData.gallery14;

        const data = await social_responsibility_model.findByIdAndUpdate({ _id: id }, { description1, description2, heading1, heading2, subheading1, content1, subheading2, content2, subheading3, content3, subheading4, content4, subheading5, content5, subheading6, content6, title, keyword, meta_description, icon1, icon2, icon3, icon4, icon5, icon6, breadcrumb_image, image1, image2, gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10, gallery11, gallery12, gallery13, gallery14 });


        if (req.files?.icon1 && data?.icon1) {
            fs.unlinkSync(`./uploads/${data?.icon1}`)
        }
        if (req.files?.icon2 && data?.icon2) {
            fs.unlinkSync(`./uploads/${data?.icon2}`)
        }
        if (req.files?.icon3 && data?.icon3) {
            fs.unlinkSync(`./uploads/${data?.icon3}`)
        }
        if (req.files?.icon4 && data?.icon4) {
            fs.unlinkSync(`./uploads/${data?.icon4}`)
        }
        if (req.files?.icon5 && data?.icon5) {
            fs.unlinkSync(`./uploads/${data?.icon5}`)
        }
        if (req.files?.icon6 && data?.icon6) {
            fs.unlinkSync(`./uploads/${data?.icon6}`)
        }
        if (req.files?.image1 && data?.image1) {
            fs.unlinkSync(`./uploads/${data?.image1}`)
        }
        if (req.files?.image2 && data?.image2) {
            fs.unlinkSync(`./uploads/${data?.image2}`)
        }
        if (req.files?.breadcrumb_image && data?.breadcrumb_image) {
            fs.unlinkSync(`./uploads/${data?.breadcrumb_image}`)
        }
        if (req.files?.gallery1 && data?.gallery1) {
            fs.unlinkSync(`./uploads/${data?.gallery1}`)
        }
        if (req.files?.gallery2 && data?.gallery2) {
            fs.unlinkSync(`./uploads/${data?.gallery2}`)
        }
        if (req.files?.gallery3 && data?.gallery3) {
            fs.unlinkSync(`./uploads/${data?.gallery3}`)
        }
        if (req.files?.gallery4 && data?.gallery4) {
            fs.unlinkSync(`./uploads/${data?.gallery4}`)
        }
        if (req.files?.gallery5 && data?.gallery5) {
            fs.unlinkSync(`./uploads/${data?.gallery5}`)
        }
        if (req.files?.gallery6 && data?.gallery6) {
            fs.unlinkSync(`./uploads/${data?.gallery6}`)
        }
        if (req.files?.gallery7 && data?.gallery7) {
            fs.unlinkSync(`./uploads/${data?.gallery7}`)
        }
        if (req.files?.gallery8 && data?.gallery8) {
            fs.unlinkSync(`./uploads/${data?.gallery8}`)
        }
        if (req.files?.gallery9 && data?.gallery9) {
            fs.unlinkSync(`./uploads/${data?.gallery9}`)
        }
        if (req.files?.gallery10 && data?.gallery10) {
            fs.unlinkSync(`./uploads/${data?.gallery10}`)
        }
        if (req.files?.gallery11 && data?.gallery11) {
            fs.unlinkSync(`./uploads/${data?.gallery11}`)
        }
        if (req.files?.gallery12 && data?.gallery12) {
            fs.unlinkSync(`./uploads/${data?.gallery12}`)
        }
        if (req.files?.gallery13 && data?.gallery13) {
            fs.unlinkSync(`./uploads/${data?.gallery13}`)
        }
        if (req.files?.gallery14 && data?.gallery14) {
            fs.unlinkSync(`./uploads/${data?.gallery14}`)
        }

        res.json({ message: "Updated successfully", status: 1 })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const getResponsibilityData = async (req, res) => {
    try {
        const data = await social_responsibility_model.findOne({});

        data.icon1 = `${BASE_URL}/uploads/${data.icon1}`
        data.icon2 = `${BASE_URL}/uploads/${data.icon2}`
        data.icon3 = `${BASE_URL}/uploads/${data.icon3}`
        data.icon4 = `${BASE_URL}/uploads/${data.icon4}`
        data.icon5 = `${BASE_URL}/uploads/${data.icon5}`
        data.icon6 = `${BASE_URL}/uploads/${data.icon6}`
        data.image1 = `${BASE_URL}/uploads/${data.image1}`
        data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.breadcrumb_image = `${BASE_URL}/uploads/${data.breadcrumb_image}`

        data.gallery1 = `${BASE_URL}/uploads/${data.gallery1}`
        data.gallery2 = `${BASE_URL}/uploads/${data.gallery2}`
        data.gallery3 = `${BASE_URL}/uploads/${data.gallery3}`
        data.gallery4 = `${BASE_URL}/uploads/${data.gallery4}`
        data.gallery5 = `${BASE_URL}/uploads/${data.gallery5}`
        data.gallery6 = `${BASE_URL}/uploads/${data.gallery6}`
        data.gallery7 = `${BASE_URL}/uploads/${data.gallery7}`
        data.gallery8 = `${BASE_URL}/uploads/${data.gallery8}`
        data.gallery9 = `${BASE_URL}/uploads/${data.gallery9}`
        data.gallery10 = `${BASE_URL}/uploads/${data.gallery10}`
        data.gallery11 = `${BASE_URL}/uploads/${data.gallery11}`
        data.gallery12 = `${BASE_URL}/uploads/${data.gallery12}`
        data.gallery13 = `${BASE_URL}/uploads/${data.gallery13}`
        data.gallery14 = `${BASE_URL}/uploads/${data.gallery14}`

        res.json({ message: "get data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

module.exports = {
    updateResponsibility,
    getResponsibilityData
}