const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('../utils/list_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialData
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

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
            console.log(blog.likes);
            expect(blog.likes).toBe(0)
        })
})