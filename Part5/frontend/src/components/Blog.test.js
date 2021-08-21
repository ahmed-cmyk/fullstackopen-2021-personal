import React from 'react'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

let component
const mockHandlerUpdate = jest.fn()
const mockHandlerDelete = jest.fn()

beforeEach(() => {
  const blog = {
    title: 'Test Blog',
    author: 'System',
    url: 'www.example.com',
    likes: 10,
    user: {
      username: 'system'
    }
  }

  const user = {
    name: 'System',
    username: 'system'
  }

  component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandlerUpdate} deleteBlog={mockHandlerDelete} />
  )
})

test('title and author are rendered by default', () => {
  const blogContainer = component.container.querySelector('.blogDetails')
  const title = component.container.querySelector('.blogTitle')
  const author = component.container.querySelector('.blogAuthor')
  const expandedDetails = component.container.querySelector('.blogExpDetails')

  console.log(prettyDOM(blogContainer))

  expect(title).not.toHaveStyle('display: none')
  expect(author).not.toHaveStyle('display: none')
  expect(expandedDetails).toHaveStyle('display: none')
})

