const social_responsibility_model = require("../model/social_responsibility_model");
const BASE_URL = process.env.BASE_URL;
const fs = require("fs");


const updateResponsibility = async (req, res) => {
    try {
        const { description1, heading1, title, keyword, meta_description, id } = req.body;

        const currentData = await social_responsibility_model.findOne({ _id: id });

        const image1 = req.files?.image1?.[0].filename || currentData.image1;

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

        const data = await social_responsibility_model.findByIdAndUpdate({ _id: id }, { description1, heading1, title, keyword, meta_description, image1, gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10, gallery11, gallery12, gallery13, gallery14 });



        ["image1", "gallery1", "gallery2", "gallery3", "gallery4", "gallery5", "gallery6", "gallery7", "gallery8", "gallery9", "gallery10", "gallery11", "gallery12", "gallery13", "gallery14"].forEach((image) => {
            const updatedImage = req.files?.[image]?.[0]?.filename
            if(updatedImage && currentData[image] && updatedImage !== currentData[image]){
                fs.unlinkSync(`./uploads/${currentData[image]}`)
            }
        })
        

        res.json({ message: "Updated successfully", status: 1 })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const getResponsibilityData = async (req, res) => {
    try {
        const data = await social_responsibility_model.findOne({});

        data.image1 = `${BASE_URL}/uploads/${data.image1}`

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