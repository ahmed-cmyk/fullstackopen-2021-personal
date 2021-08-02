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

    const initCount = Blog.find({}).count()
    let postID = 0
    await newPost
            .save()
            .then((result) => {
                postID = result._id
            })

    const endCount = await Blog.find({}).count()

    Blog.deleteOne({ _id: postID })
    expect(initCount === (endCount - 1))
})