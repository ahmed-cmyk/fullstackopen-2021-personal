import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

describe('Blog tests', () => {
  test('title and author are rendered by default', () => {
    const title = component.container.querySelector('.blogTitle')
    const author = component.container.querySelector('.blogAuthor')

    // Likes and URL are defined inside the expanded details class
    const expandedDetails = component.container.querySelector('.blogExpDetails')

    expect(title).not.toHaveStyle('display: none')
    expect(author).not.toHaveStyle('display: none')
    expect(expandedDetails).toHaveStyle('display: none')
  })

  test('Clicking "view" displays the url and number of likes', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    // Likes and URL are defined inside the expanded details class
    const expandedDetails = component.container.querySelector('.blogExpDetails')

    expect(expandedDetails).not.toHaveStyle('display: none')
  })

  test('Clicking "like" twice calls handler twice', () => {
    const likeButton = component.container.querySelector('.blogLikes_button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })
})
