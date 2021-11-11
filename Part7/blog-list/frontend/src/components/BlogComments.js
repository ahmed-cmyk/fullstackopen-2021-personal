import React from 'react'

const BlogComments = ({ blog }) => {
  return(
    <div>
      {!blog.comments.length ?
        <div>No comments...</div> :
        <ul className="px-3">
          {blog.comments.map((comment, index) =>
            <li className="border-solid border-4 border-light-gray-500 rounded-md my-3" key={index}>{comment}</li>
          )}
        </ul>
      }
    </div>
  )
}

export default BlogComments