const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
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

    const blog = new Blog(body)
    const result = await blog.save()
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
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter