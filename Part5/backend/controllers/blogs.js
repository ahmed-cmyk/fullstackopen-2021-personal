const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
                    .find({})
                    .populate('user', { username: 1, name: 1 })
    
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.send(blog)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    if(body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        user,
        url: body.url,
        likes: body.likes
    })

    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    response.status(201).json(result)
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const returnedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog)

    if(returnedBlog) {
        response.json(returnedBlog.toJSON())
    } else {
        response.status(404).end()
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user
    const blog = Blog.findById(request.params.id)
    
    if ( blog.user.toString() === user._id.toString() ) {
        await blog.remove()
        response
            .status(204)
            .end()
    } else {
        response
            .status(401)
            .json({
                error: "you don't have permission to perform the requested action"
            })
    }
})

module.exports = blogRouter