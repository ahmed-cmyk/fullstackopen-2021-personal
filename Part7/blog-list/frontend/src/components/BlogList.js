import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return(
    <ul className="blog_list">
      {blogs.map((blog, index) =>
        <Link key={index} to={`/blogs/${blog.id}`}>
          <li className="blog_list_item">{blog.title} {blog.author}</li>
        </Link>
      )}
    </ul>
  )
}

export default BlogList