import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const setConfig = () => {
  return { headers: { Authorization: token } }
}

const getAll = () => {
  const config = setConfig()
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = setConfig()

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog, id) => {
  const config = setConfig()
  const blogUrl = baseUrl + `/${id}`

  const response = await axios.put(blogUrl, updatedBlog, config)
  return response.data
}

const addComment = async (updatedBlog, id) => {
  const config = setConfig()
  const blogUrl = baseUrl + `/${id}/comments`

  await axios.put(blogUrl, updatedBlog, config)
    .then(data => {
      return data
    })
}

const deleteBlog = async (id) => {
  const config = setConfig()
  const blogUrl = baseUrl + `/${id}`

  const response = await axios.delete(blogUrl, config)
  return response.status
}

export default { setToken, getAll, create, update, addComment, deleteBlog }