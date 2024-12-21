const case_study_model = require("../model/case_study_model");
const fs = require('fs');
const BASE_URL = process.env.BASE_URL

const createCaseStudy = async (req, res) => {
    try {
        const { solution_id, heading, slug, description, title, keyword, meta_description } = req.body;
        const image = req.file ? req.file.filename : null

        if (!solution_id || !heading || !slug) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill the required fields", status: 0 });
        }

        if (slug.includes(" ")) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: `Slug can not contain spaces,use instead "example-slug"`, status: 0 });
        }

        const isCaseStudyExist = await case_study_model.findOne({ slug: slug });
        if (isCaseStudyExist) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Already exist", status: 0 });
        }

        const data = new case_study_model({ solution_id, heading, slug, description, title, keyword, meta_description, image });
        await data.save();
        res.json({ message: "Case study created successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateCaseStudy = async (req, res) => {
    try {
        const { solution_id, heading, slug, description, title, keyword, meta_description, id } = req.body;


        const image = req.file ? req.file.filename : case_study_model?.image

        if (!solution_id || !heading || !slug) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill the required fields", status: 0 });
        }

        if (slug.includes(" ")) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: `Slug can not contain spaces,use instead "example-slug"`, status: 0 });
        }

        const isCaseStudyExist = await case_study_model.findOne({ slug: slug, _id: { $ne: id } });
        if (isCaseStudyExist) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Already exist", status: 0 });
        }

        const data = await case_study_model.findByIdAndUpdate({ _id: id }, { solution_id, heading, slug, description, title, keyword, meta_description, image });
        if (!data) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Unable to update case study", status: 0 });
        }
        if (req.file && data.image && data.image !== req.file?.filename) {
            fs.unlinkSync(`./uploads/${data.image}`);
        }
        res.json({ message: "Casestudy updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteCaseStudy = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await case_study_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete case study data", status: 0 })
        }
        if (req.file) {
            fs.unlinkSync(`./uploads${req.file.filname}`)
        }
        res.json({ message: "deleted successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllCaseStudyData = async (req, res) => {
    try {
        let data = await case_study_model.find({});
        if (!data) {
            return res.json({ message: "Unablt to get case study data", status: 0 });
        }

        data = data?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        res.json({ message: "Get case study data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getCaseStudyData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await case_study_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unablt to get case study data", status: 0 });
        }
        data.image = `${BASE_URL}/uploads/${data.image}`
        res.json({ message: "Get case study data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const data = await case_study_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 });
        if (!data) {
            return res.json({ message: "Unable to change the status", status: 0 })
        }
        res.json({ message: "Status changed", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getActiveCaseStudy = async (req, res) => {
    try {
        let data = await case_study_model.find({ status: 1 });
        if (!data) {
            return res.json({ message: "Unablt to get case study data", status: 0 });
        }
        data = data?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        res.json({ message: "Get case study data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}
const getCaseStudyBySlug = async (req, res) => {
    try {
        const { slug } = req.body;
        const data = await case_study_model.findOne({ slug: slug });
        if (!data) {
            return res.json({ message: "Unablt to get case study data", status: 0 });
        }
        data.image = `${BASE_URL}/uploads/${data.image}`
        res.json({ message: "Get case study data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}
const getLatestCaseStudy = async (req, res) => {
    try {
        let data = await case_study_model.find({ status: 1 }).sort({ _id: -1 }).limit(6);
        if (!data) {
            return res.json({ message: "Unablt to get case study data", status: 0 });
        }
        data = data?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        res.json({ message: "Get case study data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    getAllCaseStudyData,
    getCaseStudyData,
    changeStatus,
    getActiveCaseStudy,
    getCaseStudyBySlug,
    getLatestCaseStudy
}