const home_model = require("../model/home_model");
const solution_model = require("../model/solution_model");
const testimonial_model = require("../model/testimonial_model");
const blog_model = require("../model/blog_model");
const banner_model = require("../model/banner_model");
const fs = require("fs");
const contact_model = require("../model/contact_model");
const job_enquiry_model = require("../model/job_enquiry_model");
const BASE_URL = process.env.BASE_URL;

const getHomePageData = async (req, res) => {
    try {
        const data = await home_model.findOne({}).lean();
        if (!data) {
            return res.json({ message: "Unable to get home page data", status: 0 })
        }

        const modifiedData = {
            _id: data._id,
            heading: data.why_choose_us.heading,
            description: data.why_choose_us.description,
            image: `${BASE_URL}/uploads/${data.why_choose_us.image}`,
            mission_content: data.why_choose_us.mission_content,
            vision_content: data.why_choose_us.vision_content,
            values_content: data.why_choose_us.values_content,
            subheading1: data.our_expertise.subheading1,
            content1: data.our_expertise.content1,
            icon1: `${BASE_URL}/uploads/${data.our_expertise.icon1}`,
            subheading2: data.our_expertise.subheading2,
            content2: data.our_expertise.content2,
            icon2: `${BASE_URL}/uploads/${data.our_expertise.icon2}`,
            subheading3: data.our_expertise.subheading3,
            content3: data.our_expertise.content3,
            icon3: `${BASE_URL}/uploads/${data.our_expertise.icon3}`,
            subheading4: data.our_expertise.subheading4,
            content4: data.our_expertise.content4,
            icon4: `${BASE_URL}/uploads/${data.our_expertise.icon4}`,
            title: data.meta_tags.title,
            keyword: data.meta_tags.keyword,
            meta_description: data.meta_tags.meta_description,
        }
        res.json({
            message: "Get home page data", status: 1, data: modifiedData
        });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateHomePageData = async (req, res) => {
    try {
        const { heading, description, vision_content, mission_content, values_content, subheading1, subheading2, subheading3, subheading4, content1, content2, content3, content4, title, keyword, meta_description, id } = req.body;

        console.log(req.files);
        const currentData = await home_model.findOne({ _id: id });
        const image = req.files?.image?.[0].filename || currentData?.why_choose_us?.image;
        const icon1 = req.files?.icon1?.[0].filename || currentData?.our_expertise?.icon1;
        const icon2 = req.files?.icon2?.[0].filename || currentData?.our_expertise?.icon2;
        const icon3 = req.files?.icon3?.[0].filename || currentData?.our_expertise?.icon3;
        const icon4 = req.files?.icon4?.[0].filename || currentData?.our_expertise?.icon4;

        const why_choose_us = {
            heading, description, image, vision_content, mission_content, values_content
        }

        const our_expertise = {
            subheading1, subheading2, subheading3, subheading4, content1, content2, content3, content4, icon1, icon2, icon3, icon4
        }

        const meta_tags = {
            title, keyword, meta_description
        }

        const data = await home_model.findByIdAndUpdate({ _id: id }, { why_choose_us, our_expertise, meta_tags });

        if (req.files?.image && data.why_choose_us.image) {
            fs.unlinkSync(`./uploads/${data.why_choose_us.image}`);
        }

        if (req.files?.icon1 && data.our_expertise.icon1) {
            fs.unlinkSync(`./uploads/${data.our_expertise.icon1}`);
        }

        if (req.files?.icon2 && data.our_expertise.icon2) {
            fs.unlinkSync(`./uploads/${data.our_expertise.icon2}`);
        }

        if (req.files?.icon3 && data.our_expertise.icon3) {
            fs.unlinkSync(`./uploads/${data.our_expertise.icon3}`);
        }

        if (req.files?.icon4 && data.our_expertise.icon4) {
            fs.unlinkSync(`./uploads/${data.our_expertise.icon4}`);
        }

        res.json({ message: "updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


//Home page api
const HomePageAPI = async (req, res) => {
    try {
        const data = await home_model.findOne({}).lean();
        if (!data) {
            return res.json({ message: "Unable to get home page data", status: 0 });
        }

        data.why_choose_us.image = `${BASE_URL}/uploads/${data.why_choose_us.image}`
        data.our_expertise.icon1 = `${BASE_URL}/uploads/${data.our_expertise.icon1}`
        data.our_expertise.icon2 = `${BASE_URL}/uploads/${data.our_expertise.icon2}`
        data.our_expertise.icon3 = `${BASE_URL}/uploads/${data.our_expertise.icon3}`
        data.our_expertise.icon4 = `${BASE_URL}/uploads/${data.our_expertise.icon4}`


        let banner = await banner_model.find({ status: 1 });
        banner = banner?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        data.banner = banner;

        let solution = await solution_model.find({ status: 1 });
        solution = solution?.map((ele) => {
            ele.solution_image = `${BASE_URL}/uploads/${ele.solution_image}`
            return ele;
        })
        data.solution = solution;

        let testimonial = await testimonial_model.find({ status: 1 }).sort({ _id: -1 }).limit(5);
        testimonial = testimonial?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        data.testimonial = testimonial;

        let blogs = await blog_model.find({ status: 1 }).sort({ _id: -1 }).limit(3);
        blogs = blogs?.map((ele) => {
            ele.main_image = `${BASE_URL}/uploads/${ele.main_image}`
            return ele;
        })
        data.blogs = blogs;

        res.json({ message: "Get Home page data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const adminHomePageApi = async (req, res) => {
    try {
        const contactEnquiryData = await contact_model.countDocuments({});
        const jobEnquiryData = await job_enquiry_model.countDocuments({});

        res.json({
            message: "Get Length data", status: 1, data: {
                contactEnquiryData, jobEnquiryData
            }
        })
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    getHomePageData,
    updateHomePageData,
    adminHomePageApi,
    HomePageAPI
}