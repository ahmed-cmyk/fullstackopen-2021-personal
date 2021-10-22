import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const anecdote = { content, votes: 0 }
    const response = await axios.post(baseUrl, anecdote)
    return response.data
}

const incrementVotes = async (content) => {
    const votes = content.votes + 1
    const updatedObject = {
        ...content,
        votes
    }
    const objectUrl = baseUrl + `/${content.id}`
    const response = await axios.put(objectUrl, updatedObject)
    return response.data
}

export default { createNew, getAll, incrementVotes }