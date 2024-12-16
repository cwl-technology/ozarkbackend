const faq_model = require("../model/faq_model");

const createFAQ = async (req, res) => {
    try {
        const { solution_id, heading, content } = req.body;
        if (!solution_id || !heading || !content) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new faq_model({ solution_id, heading, content });
        await data.save();
        res.json({ message: "FAQ created successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ messag: "Internal server error", status: 0 });
    }
}

const updateFAQ = async (req, res) => {
    try {
        const { id, solution_id, heading, content } = req.body;
        if (!solution_id || !heading || !content) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = await faq_model.findByIdAndUpdate({ _id: id }, { solution_id, heading, content });
        if (!data) {
            res.json({ message: "Unable to update FAQ data", status: 0 });
        }
        res.json({ message: "FAQ data updated", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteFAQ = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await faq_model.findByIdAndDelete({ _id: id });
        if (!data) {
            res.json({ message: "Unable to delete FAQ data", status: 0 });
        }
        res.json({ message: "FAQ data deleted", status: 1 });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllFAQData = async (req, res) => {
    try {
        const data = await faq_model.find();
        res.json({ message: "FAQ data deleted", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getFAQData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await faq_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get FAQ data", status: 0 });
        }
        res.json({ message: "FAQ data deleted", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const data = await faq_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 })
        if (!data) {
            return res.json({ message: "Unable to change status", status: 0 });
        }
        res.json({ message: "status changed", status: 1 });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getActiveFaqData = async (req, res) => {
    try {
        const data = await faq_model.find({ status: 1 });
        if (!data) {
            return res.json({ message: "Unable to get FAQ data", status: 0 });
        }
        res.json({ message: "FAQ data deleted", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createFAQ,
    updateFAQ,
    deleteFAQ,
    getAllFAQData,
    getFAQData,
    changeStatus,
    getActiveFaqData
}