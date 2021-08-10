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

    const initCount = await Blog.find({}).count()
    let postID = 0
    await newPost
            .save()
            .then((blog) => {
                postID = blog._id
            })

    let endCount = await Blog.find({}).count()
    console.log(`End count ${typeof initCount}`);
    expect(initCount).toBe(endCount - 1)
})

test('likes defaults to 0', async() => {
    const newPost = new Blog({
        title: "Likes Test",
        author: "System",
        url: "www.testURL.com"
    })

    await newPost
        .save()
        .then((blog) => {
            expect(blog.likes).toBe(0)
        })
})