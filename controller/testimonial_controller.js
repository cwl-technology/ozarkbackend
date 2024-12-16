const testimonial_model = require("../model/testimonial_model");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL

const createTestimonials = async (req, res) => {
    try {
        const { solution_id, name, designation, content, rating } = req.body;
        const image = req.file ? req.file.filename : null

        if (!solution_id || !name || !designation || !content || !rating || !solution_id || !image) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new testimonial_model({ solution_id, name, designation, content, rating, image });
        await data.save();
        res.json({ message: "Testimonial created successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateTestimonials = async (req, res) => {
    try {
        const { solution_id, name, designation, content, rating, id } = req.body;

        const currentTestimonial = await testimonial_model.findOne({ _id: id });
        const image = req.file ? req.file.filename : currentTestimonial.image


        if (!solution_id || !name || !designation || !content || !rating || !solution_id || !image) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = await testimonial_model.findByIdAndUpdate({ _id: id }, { solution_id, name, designation, content, rating, image });

        if (!data) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Unable to update testimonials", status: 0 });
        }

        if (image && image != currentTestimonial.image) {
            fs.unlinkSync(`./uploads/${currentTestimonial.image}`);
        }

        await data.save();
        res.json({ message: "Testimonial updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteTestimonials = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await testimonial_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete testimonial", status: 0 });
        }

        if (data.image) {
            fs.unlinkSync(`./uploads/${data.image}`);
        }
        res.json({ message: "Testimonial deleted successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllTestimonials = async (req, res) => {
    try {
        const data = await testimonial_model.find();
        if (!data) {
            return res.json({ message: "Unable to get testimonials data", status: 0 });
        }
        const modifiedData = data.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        res.json({ message: "Get testimonials data", status: 1, data: modifiedData });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getTestimonial = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await testimonial_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get testimonials data", status: 0 });
        }
        data.image = `${BASE_URL}/uploads/${data.image}`
        res.json({ message: "Get testimonials data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const data = await testimonial_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 })
        if (!data) {
            return res.json({ message: "Unable to change status", status: 0 });
        }
        res.json({ message: "Status changed", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


//Testimonials for STATUS = 1
const getAllActiveTestimonials = async (req, res) => {
    try {
        const data = await testimonial_model.find({ status: 1 });
        if (!data) {
            return res.json({ "message": "Unable to get testimonial data", status: 0 });
        }
        const modifiedData = data?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele
        })
        res.json({ message: "Get testimonial data successfully", status: 1, data: modifiedData });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}
module.exports = {
    createTestimonials,
    updateTestimonials,
    deleteTestimonials,
    getAllTestimonials,
    getTestimonial,
    changeStatus,
    getAllActiveTestimonials
}