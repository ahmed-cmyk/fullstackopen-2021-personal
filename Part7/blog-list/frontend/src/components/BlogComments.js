import React from 'react'

const BlogComments = ({ blog }) => {
  console.log(blog.comments.length)

  return(
    <div>
      {!blog.comments.length ?
        <div>No comments...</div> :
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      }
    </div>
  )
}

export default BlogComments