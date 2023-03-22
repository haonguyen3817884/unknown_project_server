const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    blogTitle: {
        type: String
    },
    blogImage: {
        type: String
    },
    blogDetail: {
        type: String
    },
    blogAuthorName: {
        type: String
    },
    blogAuthorAvatar: {
        type: String
    }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;