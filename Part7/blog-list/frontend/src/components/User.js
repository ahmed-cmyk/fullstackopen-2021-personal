import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const User = () => {
  const id = useParams().id
  const user = useSelector(state =>
    state.users ?
      state.users.find(user => user.id === id) :
      null
  )

  if(!user) return null

  return(
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>

      {user.blogs ?
        <ul>
          {user.blogs.map((blog, index) =>
            <li key={index}>{blog.title}</li>
          )}
        </ul>
        : <p>No blogs</p>
      }
    </div>
  )
}

export default User