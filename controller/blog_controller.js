const blog_model = require("../model/blog_model");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

const createBlog = async (req, res) => {
    try {
        const { solution_id, heading, slug, description1, blog_date, description2, title, keyword, meta_description } = req.body;

        const image1 = req.files ? req.files.image1 ? req.files.image1[0].filename : null : null
        const image2 = req.files ? req.files.image2 ? req.files.image2[0].filename : null : null
        const image3 = req.files ? req.files.image3 ? req.files.image3[0].filename : null : null
        const main_image = req.files ? req.files.main_image ? req.files.main_image[0].filename : null : null


        if (!solution_id || !heading || !slug) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Please provide required all the fields", status: 0 });
        }

        if (slug.includes(" ")) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Invalid slug", status: 0 });
        }

        const isBlogExist = await blog_model.findOne({ slug: slug });
        if (isBlogExist) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Blog already exist", status: 0 });
        }

        const data = new blog_model({ solution_id, heading, slug, blog_date, description1, description2, image1, image2, image3, main_image, title, keyword, meta_description });
        await data.save();
        res.json({ message: "Blog created successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateBlog = async (req, res) => {
    try {
        const { solution_id, heading, slug, blog_date, description1, description2, title, keyword, meta_description, id } = req.body;

        const image1 = req.files ? req.files.image1 ? req.files.image1[0].filename : null : null
        const image2 = req.files ? req.files.image2 ? req.files.image2[0].filename : null : null
        const image3 = req.files ? req.files.image3 ? req.files.image3[0].filename : null : null
        const main_image = req.files ? req.files.main_image ? req.files.main_image[0].filename : null : null



        const currentData = await blog_model.findOne({ slug: slug });
        if (!solution_id || !heading || !slug) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Please provide all required the fields", status: 0 });
        }

        if (slug.includes(" ")) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Invalid slug", status: 0 });
        }


        const isBlogExist = await blog_model.findOne({ _id: { $ne: id }, slug: slug });
        if (isBlogExist) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Blog already exist", status: 0 });
        }

        const data = await blog_model.findByIdAndUpdate({ _id: id }, {
            solution_id, heading, slug, blog_date, description1, description2, title, keyword, meta_description,
            image1: image1 ? image1 : currentData.image1,
            image2: image2 ? image2 : currentData.image2,
            image3: image3 ? image3 : currentData.image3,
            main_image: main_image ? main_image : currentData.main_image
        });

        if (!data) {
            [image1, image2, image3, main_image].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`)
                }
            })
            return res.json({ message: "Unable to update blog", status: 0 });
        }

        if (image1 && data.image1) {
            fs.unlinkSync(`./uploads/${data.image1}`)
        }
        if (image2 && data.image2) {
            fs.unlinkSync(`./uploads/${data.image2}`)
        }
        if (image3 && data.image3) {
            fs.unlinkSync(`./uploads/${data.image3}`);
        }
        if (main_image && data.main_image) {
            fs.unlinkSync(`./uploads/${data.main_image}`);
        }

        res.json({ message: "Blog updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await blog_model.findByIdAndDelete({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to delete blog", status: 0 });
        }
        console.log(data);
        [data.image1, data.image2, data.image3, data.main_image].forEach((image) => {
            console.log(image);
            if (image) {
                fs.unlinkSync(`./uploads/${image}`);
            }
        })
        res.json({ message: "Blog deleted successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const data = await blog_model.find();
        if (!data) {
            return res.json({ message: "Unable to get blog data", status: 0 });
        }
        const modifiedData = data?.map((ele) => {
            ele.image1 = `${BASE_URL}/uploads/${ele.image1}`
            ele.image2 = `${BASE_URL}/uploads/${ele.image2}`
            ele.image3 = `${BASE_URL}/uploads/${ele.image3}`
            ele.main_image = `${BASE_URL}/uploads/${ele.main_image}`
            return ele
        })

        return res.json({ message: "Get blog data", status: 1, data: modifiedData });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getBlogData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await blog_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get blog data", status: 0 });
        }
        data.image1 = `${BASE_URL}/uploads/${data.image1}`
        data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.image3 = `${BASE_URL}/uploads/${data.image3}`
        data.main_image = `${BASE_URL}/uploads/${data.main_image}`
        return res.json({ message: "Get blog data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const changeStatus = async (req, res) => {
    try {
        const { status, id } = req.body;
        const data = await blog_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 });
        if (!data) {
            return res.json({ message: "Unable to update status", status: 0 });
        }
        res.json({ message: "status changed", status: 1 });
    } catch (err) {
        console.log(err)
        res.json({ message: "Internal server error", status: 0 });
    }
}


// Blogs API for frontend

const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.body;
        const data = blog_model.findOne({ status: 1, slug });
        if (!data) {
            res.json({ message: "Unable to get Blog data", status: 0 });
        }

        res.json({ message: "get bLog data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getLatestBlog = async (req, res) => {
    try {
        const data = await blog_model.find({ status: 1 }).sort({ _id: -1 }).limit(3);
        if (!data) {
            res.json({ message: "Unable to get Blogs data", status: 0 });
        }

        res.json({ message: "get blogs data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}
const getAllActiveBlogs = async (req, res) => {
    try {
        const data = await blog_model.find({ status: 1 });
        if (!data) {
            res.json({ message: "Unable to get Blogs data", status: 0 });
        }

        res.json({ message: "get blogs data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createBlog,
    updateBlog,
    deleteBlog,
    getAllBlogs,
    getBlogData,
    changeStatus,
    getBlogBySlug,
    getAllActiveBlogs,
    getLatestBlog
};