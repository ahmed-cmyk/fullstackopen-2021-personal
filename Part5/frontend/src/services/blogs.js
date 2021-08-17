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
  const config = {
    headers: { Authorization: token },
  }

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
  console.log(updatedBlog);

  const response = await axios.put(blogUrl, updatedBlog, config)
  console.log(response.data);
  return response.data
}

export default { setToken, getAll, create, update }