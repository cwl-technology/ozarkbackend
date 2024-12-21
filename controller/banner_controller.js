const banner_model = require("../model/banner_model");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const createBanner = async (req, res) => {
    try {
        const { heading, title, content } = req.body;
        const image = req.file ? req.file.filename : ""

        if (!heading || !title || !content || !image) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new banner_model({ heading, title, content, image })

        await data.save();
        res.json({ message: "Banner created", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const updateBanner = async (req, res) => {
    try {
        const { heading, title, content, id } = req.body;
        const currentData = await banner_model.findOne({ _id: id });
        const image = req.file?.filename || currentData?.image

        if (!heading || !title || !content || !image) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = await banner_model.findByIdAndUpdate({ _id: id }, { heading, title, content, image });
        if (!data) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Unable to update banner data", status: 0 })
        }

        if (req.file && currentData.image != image) {
            fs.unlinkSync(`./uploads/${currentData.image}`);
        }
        res.json({ message: "Banner updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const data = await banner_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete banner", status: 0 });
        }
        res.json({ message: "Deleted successfully", status: 1 })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const getAllBanner = async (req, res) => {
    try {
        const data = await banner_model.find();
        if (!data) {
            return res.json({ message: "Unable to get banner data", status: 0 });
        }

        const modifiedData = data?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`;
            return ele;
        })
        res.json({ message: "Get banner data successfully", status: 1, data: modifiedData })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const getBannerData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await banner_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get banner data", status: 0 });
        }
        data.image = `${BASE_URL}/uploads/${data.image}`
        res.json({ message: "Get banner data successfully", status: 1, data: data })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const data = await banner_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 });
        if (!data) {
            return res.json({ message: "Unable to change status", status: 0 });
        }
        res.json({ message: "Status changed", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 })
    }
}


module.exports = {
    createBanner,
    updateBanner,
    deleteBanner,
    getAllBanner,
    getBannerData,
    changeStatus
}