const case_study_category_model = require("../model/case_study_category_model");

const createCaseStudyCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new case_study_category_model({ name });
        if (!data) {
            return res.json({ message: "Unable to create case study category", status: 0 });
        }
        await data.save();
        res.json({ message: "Created successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateCaseStudyCategory = async (req, res) => {
    try {
        const { name, id } = req.body;
        if (!name) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = await case_study_category_model.findByIdAndUpdate({ _id: id }, { name });
        if (!data) {
            return res.json({ message: "Unable to update case study category", status: 0 });
        }
        res.json({ message: "Updatedsuccessfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllCaseStudyCategory = async (req, res) => {
    try {
        const data = await case_study_category_model.find({});
        if (!data) {
            return res.json({ message: "Unable to get case study data", status: 0 });
        }
        res.json({ message: "Get case study data successfully", status: 1, data: data })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getCaseStudyDataCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await case_study_category_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get case study data", status: 0 });
        }
        res.json({ message: "Get case study data successfully", status: 1, data: data })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteCaseStudyCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await case_study_category_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete case study data", status: 0 });
        }
        res.json({ message: "Delete case study data successfully", status: 1 })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const data = await case_study_category_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 });
        if (!data) {
            return res.json({ message: "Unable to change status", status: 0 });
        }
        res.json({ message: "Status changed", status: 1 })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createCaseStudyCategory,
    updateCaseStudyCategory,
    getAllCaseStudyCategory,
    getCaseStudyDataCategory,
    deleteCaseStudyCategory,
    changeStatus
}