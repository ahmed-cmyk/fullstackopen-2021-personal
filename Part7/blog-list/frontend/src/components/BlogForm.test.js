import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

let component
const mockAddBlog = jest.fn()

beforeEach(() => {
  const user = {
    name: 'System',
    username: 'system'
  }

  component = render(
    <BlogForm user={user} addBlog={mockAddBlog} />
  )
})

describe('BlogForm tests', () => {
  test('calls event hander with right details', () => {
    // blog details
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#blogForm')

    fireEvent.change(title, {
      target: { value: 'Test Blog Title' }
    })
    fireEvent.change(author, {
      target: { value: 'Test System' }
    })
    fireEvent.change(url, {
      target: { value: 'www.example.com' }
    })
    fireEvent.submit(form)

    expect(mockAddBlog.mock.calls).toHaveLength(1)

    expect(mockAddBlog.mock.calls[0][0].title).toBe('Test Blog Title')
    expect(mockAddBlog.mock.calls[0][0].author).toBe('Test System')
    expect(mockAddBlog.mock.calls[0][0].url).toBe('www.example.com')
  })
})