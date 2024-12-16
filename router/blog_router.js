const express = require("express");
const { createBlog, updateBlog, getAllBlogs, getBlogData, deleteBlog, changeStatus, getAllActiveBlogs, getBlogBySlug, getLatestBlog } = require("../controller/blog_controller");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({ storage: storage })

router.post("/create_blog", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'main_image', maxCount: 1 }
]), createBlog);
router.post("/update_blog", upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 2 },
    { name: 'image3', maxCount: 1 },
    { name: 'main_image', maxCount: 1 }
]), updateBlog);
router.post("/delete_blog", deleteBlog);
router.get("/get_all_blogs", getAllBlogs);
router.post("/get_blog_data", getBlogData);
router.post("/change_status", changeStatus);
router.get("/get_all_active_blogs",getAllActiveBlogs);
router.post("/get_blog_by_slug",getBlogBySlug);
router.get("/get_latest_blogs",getLatestBlog);


module.exports = router;