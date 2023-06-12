import axios from 'axios'
const url = '/api/blogs'

const getAll = () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

let token
const setToken = newToken => {
    if (newToken !== null) token = `Bearer ${newToken}`
    else token = null
}

const create = async newBlog=> {
    const config = {headers: { Authorization: token },}
    const response = await axios.post(url, newBlog, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }