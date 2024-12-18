const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
require("./connect");
const cors = require("cors");

const admin_router = require("./router/admin_router");
const solution_router = require("./router/solution_router");
const benefit_router = require("./router/benefit_router");
const faq_router = require("./router/faq_router");
const testimonial_router = require("./router/testimonial_router");
const blog_router = require("./router/blog_router");
const our_story_router = require("./router/our_story_router");
const leadership_team_router = require("./router/leadership_team_router");
const team_member_router = require("./router/team_member_router");
const job_router = require("./router/job_router");
const banner_router = require("./router/banner_router");
const life_router = require("./router/life_router");
const home_router = require("./router/home_router");
const vision_value_router = require("./router/vision_value_router");
const social_responsibility_router = require("./router/social_responsiblity_router");
const career_router = require("./router/career_router");
const contact_router = require("./router/contact_router");
const case_study_router = require("./router/case_study_router");
const our_expertise_router = require("./router/our_expertise_router");

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

app.use("/api/auth/", admin_router);
app.use("/api/solution", solution_router);
app.use("/api/benefit", benefit_router);
app.use("/api/faq", faq_router);
app.use("/api/testimonials", testimonial_router);
app.use("/api/blog", blog_router);
app.use("/api/ourstory", our_story_router);
app.use("/api/leadership_team", leadership_team_router)
app.use("/api/team_member", team_member_router);
app.use("/api/jobs", job_router);
app.use("/api/banner", banner_router);
app.use("/api/life", life_router);
app.use("/api/home", home_router);
app.use("/api/vision_and_value", vision_value_router);
app.use("/api/social_responsibility", social_responsibility_router);
app.use("/api/career", career_router);
app.use("/api/contact_enquiry", contact_router);
app.use("/api/case_study", case_study_router)
app.use("/api/our_expertise", our_expertise_router)

app.get("/", (req, res) => {
    res.send("Hello ozark :)");
})

app.listen(PORT, () => {
    console.log(`server is running on the port: ${PORT}`)
})