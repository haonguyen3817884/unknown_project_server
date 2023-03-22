const Blog = require("../models/Blog");

const uploadBlog = async (req, response) => {
    try {
        const { blogTitle, blogImage, blogDetail, blogAuthorName, blogAuthorAvatar } = req.body;

        const blog = new Blog({
            blogTitle,
            blogImage,
            blogDetail,
            blogAuthorName,
            blogAuthorAvatar
        });

        await blog.save();

        return response.send({
            error: false,
            message: "",
            data: blog
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const updateBlog = async (req, response) => {
    try {
        const blogData = req.body;

        const blogId = blogData._id;

        delete blogData._id;

        const blog = await Blog.findOneAndUpdate({_id: blogId}, blogData, {new: true});
        
        if (blog === undefined || blog === null) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        return response.send({
            error: false,
            message: "",
            data: blog
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const deleteBlog = async (req, response) => {
    try {
        const blogId = req.params.id;

        await Blog.deleteOne({_id: blogId});
        
        return response.send({
            error: false,
            message: "Blog is removed",
            data: []
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const getBlog = async (req, response) => {
    try {
        const blogId = req.params.id;

        const blog = await Blog.findOne({_id: blogId});

        if (blog === undefined || blog === null) {
            return response.send({
                error: true,
                message: "Error",
                data: []
            });
        }

        return response.send({
            error: false,
            message: "",
            data: blog
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

const getBlogs = async (req, response) => {
    try {
        const blogs = await Blog.find({});

        return response.send({
            error: false,
            message: "",
            data: blogs
        });
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = {
    uploadBlog,
    updateBlog,
    deleteBlog,
    getBlog,
    getBlogs
};