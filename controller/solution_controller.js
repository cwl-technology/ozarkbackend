const solution_model = require("../model/solution_model");
const benefit_model = require("../model/benefits_model");

const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const createSolution = async (req, res) => {
    try {
        const { solution_name, solution_slug, heading, content, solution_description, sub_heading1, content1, sub_heading2, content2, why_choose_description, title, keyword, meta_description } = req.body;


        let image1 = req.files ? req.files.image1 ? req.files.image1[0].filename : null : null
        let image2 = req.files ? req.files.image2 ? req.files.image2[0].filename : null : null
        let icon1 = req.files ? req.files.icon1 ? req.files.icon1[0].filename : null : null
        let icon2 = req.files ? req.files.icon2 ? req.files.icon2[0].filename : null : null
        let solution_image = req.files ? req.files.solution_image ? req.files.solution_image[0].filename : null : null


        if (!solution_name || !solution_slug) {
            [image1, image2, icon1, icon2, solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: "Name and Slug,both are required !", status: 0 });
        }

        if (solution_slug.includes(" ")) {
            [image1, image2, icon1, icon2, solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: `Slug can not contain spaces,use instead "example-slug"`, status: 0 })
        }

        const isSolutionExist = await solution_model.findOne({ solution_slug });
        if (isSolutionExist) {
            [image1, image2, icon1, icon2, solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: "Solution already exist", status: 0 });
        }


        const data = new solution_model({ solution_name, solution_slug, heading, content, solution_description, sub_heading1, content1, sub_heading2, content2, why_choose_description, image1, image2, icon1, icon2, solution_image,title, keyword, meta_description })
        await data.save();
        return res.json({ message: "Solution created successfully", status: 1 });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateSolution = async (req, res) => {
    try {
        const { solution_name, solution_slug,heading, content, solution_description, sub_heading1, content1, sub_heading2, content2, why_choose_description, title, keyword, meta_description, id } = req.body;

        const solution = await solution_model.findOne({ _id: id });
        const image1 = req.files ? req.files.image1 ? req.files.image1[0].filename : null : null
        const image2 = req.files ? req.files.image2 ? req.files.image2[0].filename : null : null
        const icon1 = req.files ? req.files.icon1 ? req.files.icon1[0].filename : null : null
        const icon2 = req.files ? req.files.icon2 ? req.files.icon2[0].filename : null : null
        const solution_image = req.files ? req.files.solution_image ? req.files.solution_image[0].filename : null : null

        if (!solution_name || !solution_slug) {
            [image1, image2, icon1, icon2,solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: "Name and Slug,both are required", status: 0 });
        }

        if (solution_slug.includes(" ")) {
            [image1, image2, icon1, icon2,solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: `Slug can not contain spaces,use instead "example-slug"`, status: 0 });
        }

        const isSolutionExist = await solution_model.findOne({ _id: { $ne: id }, solution_slug: solution_slug });
        if (isSolutionExist) {
            [image1, image2, icon1, icon2,solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: "Solution already exist", status: 0 });
        }

        const data = await solution_model.findByIdAndUpdate({ _id: id }, { solution_name, solution_slug, heading, content, solution_description, sub_heading1, content1, sub_heading2, content2, why_choose_description, image1: image1 || solution.image1, image2: image2 || solution.image2, icon1: icon1 || solution.icon1, icon2: icon2 || solution.icon2,solution_image:solution_image || solution.solution_image ,title, keyword, meta_description })
        if (!data) {
            [image1, image2, icon1, icon2,solution_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: "Unable to update solution", status: 0 });
        }

        if (image1 && data.image1) {
            fs.unlinkSync(`./uploads/${data.image1}`)
        }
        if (image2 && data.image2) {
            fs.unlinkSync(`./uploads/${data.image2}`)
        }
        if (icon1 && data.icon1) {
            fs.unlinkSync(`./uploads/${data.icon1}`);
        }
        if (icon2 && data.icon2) {
            fs.unlinkSync(`./uploads/${data.icon2}`);
        }
        if (solution_image && data.solution_image) {
            fs.unlinkSync(`./uploads/${data.solution_image}`);
        }


        res.json({ message: "Solution updated successfully", status: 1 });


    } catch (err) {
        console.log(err)
        res.json({ message: "Internal server error", status: 0 });
    }
}




const deleteSolution = async (req, res) => {
    try {
        const { id } = req.body
        const data = await solution_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delele solution", status: 0 });
        }
        [data.image1, data.image2, data.image3].forEach((image) => {
            if (image) {
                fs.unlinkSync(`./uploads/${image}`);
            }
        })
        res.json({ message: "Solution deleted successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });

    }
}

const getAllSolutions = async (req, res) => {
    try {
        const data = await solution_model.find();
        if (!data) {
            return res.json({ message: "Unable to get solution data", status: 0 })
        }

        const modifiedData = data.map((ele) => {
            ele.image1 = `${BASE_URL}/uploads/${ele.image1}`
            ele.image2 = `${BASE_URL}/uploads/${ele.image2}`
            ele.icon1 = `${BASE_URL}/uploads/${ele.icon1}`
            ele.icon2 = `${BASE_URL}/uploads/${ele.icon2}`
            ele.solution_image = `${BASE_URL}/uploads/${ele.solution_image}`

            return ele;
        })

        res.json({ message: "Get solution data", status: 1, data: modifiedData });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getSolutionData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await solution_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get solution data", message: 0 });
        }
        data.image1 = `${BASE_URL}/uploads/${data.image1}`
        data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.icon1 = `${BASE_URL}/uploads/${data.icon1}`
        data.icon2 = `${BASE_URL}/uploads/${data.icon2}`
        data.solution_image = `${BASE_URL}/uploads/${data.solution_image}`
        res.json({ message: "Get Solution Data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const data = await solution_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 });
        if (!data) {
            return res.json({ message: "Unable to update status", status: 0 });
        }
        res.json({ message: "status changed", status: 1 });
    } catch (err) {
        console.log(err)
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getSolutionList = async (req, res) => {
    try {
        const data = await solution_model.find({ status: 1 }, { solution_name: 1, solution_slug: 1 })
        return res.json({ message: "Get solution list", status: 1, data: data });
    } catch (err) {
        console.log(err);
    }
}

// solution page api
const getSolutionBySlug = async (req, res) => {
    try {
        const { solution_slug } = req.body;
        const data = await solution_model.findOne({ status: 1, solution_slug: solution_slug }).lean();
        if (!data) {
            return res.json({ message: "Unable to get solution data", status: 0 });
        }

        data.icon1 = `${BASE_URL}/uploads/${data.icon1}`
        data.icon2 = `${BASE_URL}/uploads/${data.icon2}`
        data.image1 = `${BASE_URL}/uploads/${data.image1}`
        data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.solution_image = `${BASE_URL}/uploads/${data.solution_image}`

        const solutionList = await solution_model.find({ status: 1, solution_slug: { $ne: solution_slug } }, { solution_name: 1, solution_slug: 1 });
        data.solutionList = solutionList;

        const benefits = await benefit_model.find({ status: 1, solution_id: data._id });
        data.benefits = benefits;


        return res.json({ message: "Get solution list", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createSolution,
    updateSolution,
    deleteSolution,
    getAllSolutions,
    getSolutionData,
    changeStatus,
    getSolutionList,
    getSolutionBySlug
}