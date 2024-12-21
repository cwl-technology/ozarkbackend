const page_title_model = require("../model/page_title_model");

const updatePageTitle = async (req, res) => {
    try {
        const { type, title, keyword, meta_description } = req.body;
        const data = await page_title_model.updateOne({ type: type }, { $set: { title, keyword, meta_description } })

        if (!data) {
            return res.json({ message: "Unable to update data", status: 0 });
        }

        res.json({ message: "Updated successfully", status: 1 });

    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllPageTitleData = async (req, res) => {
    try {
        const data = await page_title_model.find({});
        // console.log(data);
        if (!data) {
            return res.json({ message: "Unable to get data", status: 0 });
        }
        return res.json({ message: "Get data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getPageTitleData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await page_title_model.findOne({ _id: id });
        if (!data) {
            return res.json({ message: "Unable to get data", status: 0 });
        }
        return res.json({ message: "Get data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

const getPageTitleDataByType = async (req, res) => {
    try {
        const { type } = req.body;
        const data = await page_title_model.findOne({ type: type });
        if (!data) {
            return res.json({ message: "Unable to get data", status: 0 });
        }
        return res.json({ message: "Get data successfully", status: 1, data: data });

    } catch (err) {
        console.log(err);
        return res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    updatePageTitle,
    getAllPageTitleData,
    getPageTitleData,
    getPageTitleDataByType
}