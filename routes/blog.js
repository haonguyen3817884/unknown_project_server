const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/getBlog/:id", blogController.getBlog);
router.get("/getBlogs", blogController.getBlogs);

router.post("/uploadBlog", authMiddleware.verifyToken, blogController.uploadBlog);

router.put("/updateBlog", authMiddleware.verifyToken, blogController.updateBlog);

router.delete("/deleteBlog/:id", authMiddleware.verifyToken, blogController.deleteBlog);

module.exports = router;