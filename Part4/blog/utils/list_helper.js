const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {

    let likeCount = 0

    blogs.forEach(blog => {
        likeCount += blog.likes
    })

    return likeCount
}

const favoriteBlog = (blogs) => {

    let favBlog = {}
    let highestLikes = 0

    blogs.forEach(blog => {

        if (blog.likes >= highestLikes) {
            highestLikes = blog.likes
            favBlog = blog
        }
    })

    return {
        "title": favBlog.title,
        "author": favBlog.author,
        "likes": favBlog.likes
    }
}

module.exports = {
    dummy,
    favoriteBlog,
    totalLikes
}