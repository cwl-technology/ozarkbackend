const job_enquiry_model = require("../model/job_enquiry_model");
const job_model = require("../model/job_model");

const createJob = async (req, res) => {
    try {
        const { job_title, job_description, available_posts, skills } = req.body;
        console.log(req.body);
        if (!job_title || !job_description || !available_posts) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new job_model({ job_title, job_description, available_posts, skills });
        await data.save();
        res.json({ message: "Job created successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateJob = async (req, res) => {
    try {
        const { job_title, job_description, available_posts, skills, id } = req.body;
        if (!job_title || !job_description || !available_posts) {
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = await job_model.findByIdAndUpdate({ _id: id }, { job_title, job_description, available_posts, skills })
        if (!data) {
            return res.json({ message: "Unable to update job", status: 0 });
        }
        res.json({ message: "Job Updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const data = await job_model.find({});
        if (!data) {
            return res.json({ message: "Unable to get job data", status: 0 });
        }
        res.json({ message: "Get Job successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getJobData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await job_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get job data", status: 0 });
        }
        res.json({ message: "Get Job successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteJob = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await job_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete job data", status: 0 });
        }
        res.json({ message: "Job deleted", status: 1 });
    } catch (err) {
        console.log(err)
        res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const data = await job_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 })
        if (!data) {
            return res.json({ message: "Unable to update job", status: 0 });
        }
        res.json({ message: "Job Updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


const getAllActiveJobs = async (req, res) => {
    try {
        const data = await job_model.find({ status: 1 });
        if (!data) {
            return res.json({ message: "Unable to get job data", status: 0 });
        }

        res.json({ message: "Get Job successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


const postJobEnquiryData = async (req, res) => {
    try {
        const { name, email, subject, about } = req.body;
        const resume = req.file?.filename || null

        if (!name || !email) {
            return res.json({ message: "Please fill the requied fields", status: 0 });
        }

        const data = new job_enquiry_model({ name, email, subject, about, resume });
        await data.save();
        res.json({ message: "Enquiry received", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getJobEnquiryData = async (req, res) => {
    try {
        const data = await job_enquiry_model.find({});
        if (!data) {
            return res.json({ message: "Unable to get job enquiry data", status: 0 });
        }
        res.json({ message: "Get job enquiry data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}



module.exports = {
    createJob,
    updateJob,
    getAllJobs,
    getJobData,
    deleteJob,
    changeStatus,
    postJobEnquiryData,
    getJobEnquiryData,
    getAllActiveJobs
}