const contact_model = require("../model/contact_model");
const nodemailer = require("nodemailer");
const SMTP_PASS = process.env.SMTP_PASS
const SMTP_USER = process.env.SMTP_USER


const postContactEnquiryData = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email) {
            return res.json({ message: "Please fill the requied fields", status: 0 });
        }

        const data = new contact_model({ name, email, subject, message });
        await data.save();

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASS
            }
        });

        const info = await transporter.sendMail({
            from: email,
            to: "abhisheksharma0573@gmail.com",
            subject: "Contact Enquiry",
            html: `
            <h2>OZARK & CO.</h2>
            <table border="1">
                <tr>
                    <th>Name</th>
                    <td>${name}</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${email}</td>
                </tr>
                <tr>
                    <th>Subject</th>
                    <td>${subject || "Subject Unavailable"}</td>
                </tr>
                <tr>
                    <th>Message</th>
                    <td>${message || "Message Unavailable"}</td>
                </tr>
                
            </table>
            `,
            // attachments:[
            //     {
            //         filename:"Logo",
            //         path:"./images/logo2.png",
            //         cid:"attachment_1"
            //     }
            // ]
        });

        console.log(info);
        res.json({ message: "Enquiry received", status: 1 });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

const getContactEnquiryData = async (req, res) => {
    try {
        const data = await contact_model.find({});
        if (!data) {
            return res.json({ message: "Unable to get contact enquiry data", status: 0 });
        }
        res.json({ message: "Get contact enquiry data", status: 1, data: data });
    } catch (err) {
        console.log(err);
        res.json({ message: "Internal server error", status: 0 });
    }
}

module.exports = {
    postContactEnquiryData,
    getContactEnquiryData
}