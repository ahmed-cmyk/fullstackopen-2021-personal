const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the id variable exists', async () => {
    const blogs = await Blog.find({})
    expect(blogs[0].id).toBeDefined()
})

test('POST requests work', async () => {
    const newPost = new Blog({
        title: "Test",
        author: "System",
        url: "www.testURL.com",
        likes: 10
    })

    const initCount = Blog.find({})
    await newPost
            .save()
            .then((result) => {
                const endCount = Blog.find({})
                console.log(result);
                Blog.deleteOne({ id: result._id })
                expect(initCount === (endCount - 1))
            })
})