const leadership_team_model = require("../model/leadership_team_model");
const BASE_URL = process.env.BASE_URL;

const fs = require("fs");
const updateLeadership = async (req, res) => {
    try {
        const { subheading1, content1, subheading2, content2, subheading3, content3, subheading4, content4, title, keyword, meta_description, id } = req.body;

        const currentData = await leadership_team_model.find({ _id: id });

        // const image1 = req.files ? req.files.image1 ? req.files.image1[0].filename : null : null
        // const image2 = req.files ? req.files.image2 ? req.files.image2[0].filename : null : null
        const icon1 = req.files ? req.files.icon1 ? req.files.icon1[0].filename : null : null
        const icon2 = req.files ? req.files.icon2 ? req.files.icon2[0].filename : null : null
        const icon3 = req.files ? req.files.icon3 ? req.files.icon3[0].filename : null : null
        const icon4 = req.files ? req.files.icon4 ? req.files.icon4[0].filename : null : null

        const data = await leadership_team_model.findByIdAndUpdate({ _id: id }, { subheading1, content1, subheading2, content2, subheading3, content3, subheading4, content4, title, keyword, meta_description, icon1: icon1 ? icon1 : currentData.icon1, icon2: icon2 ? icon2 : currentData.icon2, icon3: icon3 ? icon3 : currentData.icon3, icon4: icon4 ? icon4 : currentData.icon4 })

        if (!data) {
            [icon1, icon2, icon3, icon4].forEach((image) => {
                if (image) {
                    fs.unlinkSync(`./uploads/${image}`);
                }
            })
            return res.json({ message: "Unable to update.", status: 0 });
        }

        // if (image1 && data.image1) {
        //     fs.unlinkSync(`./uploads/${data.image1}`);
        // }
        // if (image2 && data.image2) {
        //     fs.unlinkSync(`./uploads/${data.image2}`);
        // }

        if (icon1 && data.icon1) {
            fs.unlinkSync(`./uploads/${data.icon1}`);
        }
        if (icon2 && data.icon2) {
            fs.unlinkSync(`./uploads/${data.icon2}`);
        }
        if (icon3 && data.icon3) {
            fs.unlinkSync(`./uploads/${data.icon3}`);
        }
        if (icon4 && data.icon4) {
            fs.unlinkSync(`./uploads/${data.icon4}`);
        }
        res.json({ message: "Team page updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getLeaderShipPagedata = async (req, res) => {
    try {
        const data = await leadership_team_model.findOne({});
  
        if (!data) {
            req.json({ message: "Unable to get data", status: 0 });
        }
        // data.image1 = `${BASE_URL}/uploads/${data.image1}`
        // data.image2 = `${BASE_URL}/uploads/${data.image2}`
        data.icon1 = `${BASE_URL}/uploads/${data.icon1}`
        data.icon2 = `${BASE_URL}/uploads/${data.icon2}`
        data.icon3 = `${BASE_URL}/uploads/${data.icon3}`
        data.icon4 = `${BASE_URL}/uploads/${data.icon4}`

        res.json({ message: "Get leader ship team page data", status: 1, data: data });

    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", staus: 0 });
    }
}

module.exports = {
    updateLeadership,
    getLeaderShipPagedata
}