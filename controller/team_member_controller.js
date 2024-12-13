const team_member_model = require("../model/team_member_model");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL

const createTeamMember = async (req, res) => {
    try {
        const { name, designation } = req.body;
        const image = req.file ? req.file.filename : null;

        if (!name || !designation || !image) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = new team_member_model({ name, designation, image });
        await data.save();
        res.json({ message: "Team member created successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const updateTeamMember = async (req, res) => {
    try {
        const { name, designation, id } = req.body;

        const currentData = await team_member_model.findOne({ _id: id });
        const image = req.file ? req.file.filename : currentData?.image;

     
        if (!name || !designation || !image) {
            if (req.file) {
                fs.unlinkSync(`./uploads/${req.file.filename}`);
            }
            return res.json({ message: "Please fill all the fields", status: 0 });
        }

        const data = await team_member_model.findByIdAndUpdate({ _id: id }, { name, designation, image })
        if (image && image != data?.image) {
            fs.unlinkSync(`./uploads/${data.image}`);
        }
        res.json({ message: "Team member updated successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const deleteTeamMemeber = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await team_member_model.findByIdAndDelete({ _id: id });
        if (!data) {
            res.json({ message: "Unable to delete team member", status: 0 });
        }
        res.json({ message: "team member deleted successfully", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getTeamMemberData = async (req, res) => {
    try {
        const { id } = req.body;
        const data = await team_member_model.findOne({ _id: id });
        if (!data) {
            res.json({ message: "Unable to get team member", status: 0 });
        }
        data.image = `${BASE_URL}/uploads/${data.image}`;
        res.json({ message: "Get team member data successfully", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getAllTeamMember = async (req, res) => {
    try {
        const data = await team_member_model.find();
        if (!data) {
            res.json({ message: "Unable to get team member", status: 0 });
        }

        const modifiedData = data?.map((ele) => {
            ele.image = `${BASE_URL}/uploads/${ele.image}`
            return ele;
        })
        res.json({ message: "Get team member data successfully", status: 1, data: modifiedData });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}


const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body;
        const data = await team_member_model.findByIdAndUpdate({ _id: id }, { status: status == 1 ? 0 : 1 })
        if (!data) {
            return res.json({ message: "Unable to change status", status: 0 });
        }
        res.json({ message: "Status changed", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    createTeamMember,
    updateTeamMember,
    deleteTeamMemeber,
    getTeamMemberData,
    getAllTeamMember,
    changeStatus
}