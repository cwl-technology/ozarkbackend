const benefits_model = require("../model/benefits_model");

const createBenefit = async (req, res) => {
    try {
        const { solution_id, heading, content } = req.body;
        if (!solution_id || !heading || !content) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new benefits_model({ solution_id, heading, content });
        await data.save();
        res.json({ message: "Benefit created successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ messag: "Internal server error", status: 0 });
    }
}

const updateBenefits = async (req, res) => {
    try {
        const { id, solution_id, heading, content } = req.body;
        if (!solution_id || !heading || !content) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }
        const data = await benefits_model.findByIdAndUpdate({ _id: id }, { solution_id, heading, content });
        if (!data) {
            res.json({ message: "Unable to update benefits data", status: 0 });
        }
        res.json({ message: "Benefit data updated", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteBenefit = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await benefits_model.findByIdAndDelete({ _id: id });
        if (!data) {
            res.json({ message: "Unable to delete benefits data", status: 0 });
        }
        res.json({ message: "Benefit data deleted", status: 1 });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllBenefitData = async (req, res) => {
    try {
        const data = await benefits_model.find();
        res.json({ message: "Benefit data deleted", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getBenefitData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await benefits_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get benefit data", status: 0 });
        }
        res.json({ message: "Benefit data deleted", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const data = await benefits_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 })
        if (!data) {
            return res.json({ message: "Unable to change status", status: 0 });
        }
        res.json({ message: "status changed", status: 1 });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createBenefit,
    updateBenefits,
    deleteBenefit,
    getAllBenefitData,
    getBenefitData,
    changeStatus
}