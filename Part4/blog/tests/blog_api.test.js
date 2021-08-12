const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

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
    const initCount = await Blog.find({})

    const newPost = {
        title: "POST Test",
        author: "System",
        url: "www.testURL.com",
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newPost)

    const endCount = await Blog.find({})
    console.log(`Count ${endCount.length - 1}`);
    expect(initCount.length).toBe(endCount.length - 1)
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

test('title and url are missing', async() => {
    const newPost = {
        author: "System2",
        likes: 3
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})